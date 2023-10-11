type CustomChainConfig = {
    chainNamespace: string;
    chainId: string;
    rpcTarget: string;
    displayName: string;
    blockExplorer: string;
    ticker: string;
    tickerName: string;
};

type Question = {
    __typename: string
    answer_a: string
    answer_b: string
    answer_c: string
    correct_answer: string
    created_at: Date
    id: string | number
    question: string
    question_level: string
    question_type: string
}

type SelectFriendType = {
    friend_id: string
    friend_name: string
}