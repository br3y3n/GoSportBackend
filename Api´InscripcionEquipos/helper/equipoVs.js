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
                team1:{
                     name:team1.nombreEquipo,
                    idEquipo: team1._id
                },
                team2:{ 
                    name:team2.nombreEquipo,
                    idEquipo: team2._id}
            });
        } else {
            vs.push({
                team1:{
                     name:team1.nombreEquipo,
                    idEquipo: team1._id},
                team2:{
                     name:'no tiene nombre',
                    idEquipo: 'no tiene id'
                }
            });
        }
    }
   
    return vs;
};


export default equipoVs;

