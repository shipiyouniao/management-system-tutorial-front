interface Result<T> {
    code: number;
    data: T;
    msg: string;
}

export default Result;