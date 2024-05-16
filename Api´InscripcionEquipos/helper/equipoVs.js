const equipoVs = (teams) => {
    const vs = [];
    let id=0; 
    for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        id +=1
        if (team2) {
            vs.push({
                id: id,
                team1: team1.nombreEquipo,
                team2: team2.nombreEquipo
            });
        } else {
            vs.push({
                team1: team1.nombreEquipo,
                team2: "no tiene pareja"
            });
        }
    }

    return vs;
};

export default equipoVs;

