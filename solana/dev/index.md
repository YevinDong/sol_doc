# getProgramAccounts

一个返回程序所拥有的账户的RPC方法。目前不支持分页。请求getProgramAccounts应该包括dataSlice和filters参数，以提高响应时间并返回只有预期结果的内容。

## 参数

| 参数                     |  类型  |                        简介                        |
| ------------------------ | :----: | :------------------------------------------------: |
| programId                | string | 要查询的程序的公钥，以base58编码的字符串形式提供。 |
| configOrCommitment(可选) | object |     [configOrCommitment](#configorcommitment)      |

### configOrCommitment {#configOrCommitment}

| 参数       |  类型  |                                              简介                                               |
| ---------- | :----: | :---------------------------------------------------------------------------------------------: |
| commitment | string | [状态承诺](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) |
| encoding   | string |                   账户数据的编码方式，可以是： base58, base64, 或 jsonParsed                    |
| dataSlice  | object |                                     [dataslice](#dataslice)                                     |
| filters    | array  |                                       [filters](#filters)                                       |

#### dataSlice {#dataSlice}

dataSlice接受两个参数：

* offset: 开始返回账户数据的位置（以字节为单位）
* length: 应该返回的字节数

在处理大型数据集但实际上不关心账户数据本身时，dataSlice特别有用。

例如，如果我们想找到特定代币发行的代币账户数量（即代币持有者数量）

就可以使用dataSlice。 offset = 0,length = 0;就会在响应中,返回一个空的[account.data](#account)

| 参数   |  类型  |           简介           |
| ------ | :----: | :----------------------: |
| offset | number | 开始返回账户数据的字节数 |
| length | number | 要返回的账户数据的字节数 |

#### filters {#filters}

与getProgramAccounts一起使用的最常见参数是filters数组。该数组接受两种类型的过滤器，即dataSize和memcmp。在使用这些过滤器之前，我们应该熟悉我们请求的数据的布局和序列化方式。

dataSize :可以限定查询缩小长度为`dataSize`个字节的账户.(比如:SPL的长度为165,如下图)

![accountSize](https://solanacookbook.com/assets/account-size.398f17bf.png)

| 参数     |  类型  |                   简介                   |
| -------- | :----: | :--------------------------------------: |
| memcmp   | object |         [memcmp](#memcmp)         |
| dataSize | number | 将账户数据的长度与提供的数据大小进行比较 |

##### memcmp {#memcmp}

memcmp过滤器，也叫"内存比较"过滤器，允许我们比较存储在账户上的任何字段的数据。具体而言，我们可以查询仅与特定位置上的特定一组字节匹配的账户。memcmp需要两个参数：

* offset: 开始比较数据的位置。这个位置以字节为单位，表示为一个整数。
* bytes: 数据应该与账户的数据匹配。这表示为一个base58编码的字符串，应该限制在129个字节以下。
  
需要注意的是，memcmp只会返回与提供的bytes完全匹配的结果。目前，它不支持与提供的bytes相比小于或大于的比较。

比如: 我们指定了dataSize=165,(如上图),offset=32,bytes="钱包地址base58",就可以查到对应数据

| 参数   |  类型  |                          简介                           |
| ------ | :----: | :-----------------------------------------------------: |
| offset | number |                开始返回账户数据的字节数                 |
| bytes  | string | 要匹配的数据，以base58编码的字符串形式，限制为129个字节 |

## 响应

默认情况下，`getProgramAccounts`将返回一个具有以下结构的 JSON 对象**数组**：

| 字段    |  类型  |                 简介                 |
| ------- | :----: | :----------------------------------: |
| pubkey  | string | 账户公钥，以 base58 编码的字符串形式 |
| account | object |     [account](#account)      |

### account {#account}

| 字段       |       类型       |                                                          简介                                                           |
| ---------- | :--------------: | :---------------------------------------------------------------------------------------------------------------------: |
| lamports   |      number      |                                               分配给账户的 lamports 数量                                                |
| owner      |      string      |                                          账户所分配的程序的 base58 编码的公钥                                           |
| data       | string or object | 与账户关联的数据，根据提供的编码参数，可以是编码的二进制数据或 JSON 格式 parameter 账户所分配的程序的 base58 编码的公钥 |
| executable |     boolean      |                                                 指示账户是否包含着程序                                                  |
| rentEpoch  |      number      |                                          该账户下次需要支付租金的纪元（epoch）                                          |


```javaScript 
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
  accounts.forEach((account, i) => {
    console.log(
      `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
    );
    console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
    console.log(
      `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
    );
  });
  /*
    // Output

    Found 2 token account(s) for wallet FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T: 
    -- Token Account Address 0:  H12yCcKLHFJFfohkeKiN8v3zgaLnUMwRcnJTyB4igAsy --
    Mint: CKKDsBT6KiT4GDKs3e39Ue9tDkhuGUKM3cC2a7pmV9YK
    Amount: 1
    -- Token Account Address 1:  Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb --
    Mint: BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
    Amount: 3
  */
})();
```
