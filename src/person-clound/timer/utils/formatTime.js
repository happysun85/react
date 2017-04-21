const leadingZero = num => num.toLocaleString({}, {minimumIntegerDigits: 2});

export default  function(t = 0) {
    const msec = leadingZero(t % 100),
        sec = leadingZero(parseInt((t / 100)) % 60),
        min = leadingZero(parseInt((t / 6000)) % 60),
        hour = leadingZero(parseInt(t / 360000));
    return `${hour}:${min}:${sec}.${msec}`;
}
