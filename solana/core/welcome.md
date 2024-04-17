# Solana Core Docs

本指南包含如何入门的分步说明。在本指南的实践部分之前，我们将介绍所有开发人员在 Solana 上进行构建时需要熟悉的基本概念：

* [Transactions](#transactions)
* [Accounts](#accounts)
* [Programs](#programs)

## 工作流程简介

Solana Network可以被视为一台巨大的全球计算机，任何人都可以在这里付费存储和执行代码。部署的代码被称为程序`Programs`，在其他区块链上通常被称为"智能合约"。要与程序交互，需要从客户端在区块链上发送交易`Transactions`。

## Transactions {#transactions}

交易`Transaction`是 Solana 区块链上的基本活动单元：它是一个签了名(signed)数据结构，包含网络执行特定操作(如转移代币)的指令`instructions`。

在链上创建、更新或删除数据需要一个Transaction。读取数据无需Transaction。

所有交易都与网络上的程序互动，这些程序可以是系统程序，也可以是用户构建的程序。Transaction通过一系列指令`instructions`告诉程序他们想做什么，如果这些指令有效，程序就会执行这些指令并更新区块链的状态。把它想象成一个写入指令，如果不满足某些条件，就会被拒绝。

* Signatures: 交易签名者的数字签名Array
* Message: 交易向网络发出的实际指令
  * Message header: 3`uint8s`,说明有多少账户将签名，有多少账户不会签名，以及有多少账户为只读账户。
  * Account addresses: 交易中使用的账户地址数组
  * Recent block hash: 最近区块标识的唯一值-确保交易时间不会太长，也不会被重新处理。
  * Instructions: 调用哪个程序、使用哪个账户，以及程序执行指令所需的其他数据。
  
[更多信息](./transactions)

### Instructions

指令是 Solana 上最基本的操作单元。一笔交易可以包含一条或多条指令。指令按照区块链上的程序在交易中提供的顺序依次执行。如果指令的任何部分失败，整个交易都将失败。

[更多信息](./instructions)

## Accounts {#accounts}

Solana上的Account是存储空间，可容纳不超过 10MB 的任意数据。它们用于存储数据、用户程序和本地系统程序。

如果程序需要在交易之间存储状态，则使用Account来存储。这意味着 Solana 上的所有程序都是无状态的--它们不存储任何状态数据，只存储代码。如果一个账户存储了程序代码，那么它就被标记为 "可执行`executable`"，可以处理指令。

在Solana中，"Everythin is an Account" 类似Linux世界里面把所有的资源都抽象成"文件"一样。

最简单的方法是把Account想象成一个文件。用户可以拥有许多不同的文件。开发人员可以编写与这些文件 "对话 "的程序。

与 Linux 用户使用路径查找文件的方式相同，Solana 客户端使用地址查找账户。地址是一个 256 位的公开密钥。与文件一样，账户也包含元数据，告诉运行时谁可以访问数据以及如何访问。这可以防止账户中的数据遭到未经授权的更改。

不过与文件不同，账户包括文件生命周期内的数据。创建账户时，需要为其分配一定的空间，并需要代币(Sol)来租用该空间。如果一个账户没有足够的代币来支付租金，它就会被移除。但是，如果该账户持有的代币足够支付两年的[租金](../intro/rent)，则被视为 "免租 "账户，不会被删除。

[更多信息](./account)

## Programs {#programs}

程序是 Solana 区块链的基础。它们负责网络上发生的一切：创建账户、处理交易、收取费用等等。

程序处理来自终端用户和其他程序的Instruction。所有程序都是无状态的：与之交互的任何数据都存储在通过指令传入的独立Account中。

Solana Labs维护着两套程序：本地程序和 [Solana Program Library](https://spl.solana.com/) (SPL)。

这些程序是链上交互的核心构件。本地程序用于创建新账户、分配所有权、转移 SOL 等核心区块链功能。SPL 程序用于创建、交换和借出代币，以及生成股权池和on-chain name服务。

[更多信息](./programs)
