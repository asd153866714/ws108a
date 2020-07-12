let a = () => {
    let test = {
        a: '1',
        b: '2',
        c: '3',
    }
    let { a, b, c } = test
    console.log(a)
}
a()