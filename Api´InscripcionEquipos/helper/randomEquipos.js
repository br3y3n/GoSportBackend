function randomEquipo(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

export default randomEquipo;