const [active, setActive] = useState(() => {
    let _active: boolean[] = [];
    for (let i = 0; i < path.length; i++)
        _active.push(!i ? true : false);
    return _active;
});

const getNextView = () => {
    let _active: boolean[] = [...active];
    let _f: boolean | undefined = _active.pop();
    _active.unshift(_f === undefined ? false : _f);
    setActive(_active);
};