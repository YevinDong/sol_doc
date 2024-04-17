export default [
    {
        text: "Solana",
        collapsed: false,
        items: [{
            text: "Intro",
            collapsed: false,
            items: [
                { text: "Solana", link: "/solana/" },
                { text: "Rent", link: "/solana/intro/rent" },
                { text: "Transaction Fees", link: "/solana/intro/transactionFees" },
                { text: "Wallet", link: "/solana/intro/wallet" },
            ]
        }, {
            text: "Core Docs",
            collapsed: false,
            items: [
                { text: "Welcome", link: "/solana/core/welcome" },
                { text: "Account", link: "/solana/core/account" },
                { text: "Programs", link: "/solana/core/programs" },
                { text: "PDA", link: "/solana/core/pda" },
                { text: "Transactions", link: "/solana/core/transactions" },
                { text: "Instructions", link: "/solana/core/instructions" },
            ]
        }, {
            text: "Dev Docs",
            collapsed: false,
            items: [
                { text: "Welcome", link: "/solana/dev/index" },
            ]
        }],

    },
    {
        text: 'Rust',
        collapsed: false,
        items: [
            { text: 'Rust', link: '/rust/' },
        ]
    },
    {
        text: 'Examples',
        items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
        ]
    },
]


