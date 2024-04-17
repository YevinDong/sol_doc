# Transaction Fees

在Solana blockchain上处理`instructions(指令)`所支付额费用被称为-交易费(Gas fees/transaction fees)"

每笔交易(包含一个或多个`instructions`)通过网络发送时，都会由当前的领导者验证客户端(leader validation-client)进行处理。一旦被确认为全局状态交易(global state transaction)，这笔交易费将支付给网络，以帮助支持 Solana 区块链的经济建设。

## 如何设置fee优先级

事务的优先级费用是通过包含一条 `SetComputeUnitPrice` 指令和一条 `SetComputeUnitLimit` 指令来设置的。提交时将使用这些值重新计算优先级，并以此确定给定`transaction`在区块中的优先级。

::: code-group

```Rust [lib.rs]
let instruction = ComputeBudgetInstruction::set_compute_unit_limit(300_000);

let instruction = ComputeBudgetInstruction::set_compute_unit_price(1);
```

```JavaScript [main.js]
// need import @solana/web3.js
const instruction = ComputeBudgetProgram.setComputeUnitLimit({
  units: 300_000,
});

const instruction = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: 1,
});
```

## 最佳实践

交易申请应执行所需的最少计算单元，以尽量减少费用。还需注意的是，当申请的计算单元数超过已执行交易实际消耗的计算单元数时，费用不会自动调整。

通过`getRecentPrioritizationFees`RPC方法获取节点最近处理区块中的最近支付的优先级费用列表。

然后，您就可以利用这些数据为您的交易估算适当的优先级费用，以便:

1. 更好地确保交易得到集群处理
2. 尽量减少支付的费用

## 费用收取

交易必须至少有一个账户已签名(`signed`)交易并可写入(`writable`)。可写签名账户在交易账户列表中排在第一位，其中的第一个账户总是作为 "费用支付人(`fee payer`)"。

在处理任何交易指令之前，将扣除费用支付人账户余额以支付交易费用。如果费用支付人的余额不足以支付交易费，交易将被群组放弃。

如果余额足够，则无论交易处理成功与否，费用都会被扣除。事实上，如果任何交易指令返回错误或违反运行时限制，除了交易费用扣除外，所有账户变动都将回滚(`roll back`)。
