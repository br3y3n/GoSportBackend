async function getRandomTeam(teams) {
    return new Promise((resolve) => {
        // Filtrar equipos activos
        const activeTeams = teams.filter((team) => team.status === "active");

        if (activeTeams.length > 0) {
            // Si hay equipos activos, se resuelve la promesa y retorna un equipo activo aleatorio
            resolve(activeTeams[Math.floor(Math.random() * activeTeams.length)]);
        } else {
            // Si no hay equipos activos, seleccionea un equipo aleatorio de los perdidos o de todo el conjunto.
            const lostTeams = teams.filter((team) => team.status === "lost");
            const selectedTeam =
                lostTeams.length > 0
                    ? lostTeams[Math.floor(Math.random() * lostTeams.length)]
                    : teams[Math.floor(Math.random() * teams.length)];

            resolve(selectedTeam);
        }
    });
}

export default getRandomTeam;