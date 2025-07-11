// 포지션 목록
const positions = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

// 팀, 이름 데이터
const teams = [
  'Yankees', 'Dodgers', 'Red Sox', 'Giants', 'Cubs', 
  'Cardinals', 'Astros', 'Braves', 'Phillies', 'Mets'
];
const firstNames = [
  'Mike', 'John', 'David', 'Chris', 'Matt', 'Steve', 'Tony', 'Joe', 'Ryan', 'Kevin',
  'Carlos', 'Jose', 'Luis', 'Miguel', 'Roberto', 'Fernando', 'Alex', 'Daniel', 'Mark', 'Paul'
];
const lastNames = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez',
  'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'
];

function generateBirthdate() {
  const year = 1990 + Math.floor(Math.random() * 15); // 1990-2004
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${month}/${day}/${year}`;
}

function generatePlayer(position, teamIndex) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const team = teams[teamIndex];
  const score = 75 + Math.floor(Math.random() * 25); // 75-99 score
  return {
    name: `${firstName} ${lastName}`,
    team,
    position,
    birthdate: generateBirthdate(),
    score
  };
}

// 전체 선수 생성
function generatePlayers() {
  const players = [];
  positions.forEach(position => {
    for (let teamIndex = 0; teamIndex < 10; teamIndex++) {
      players.push(generatePlayer(position, teamIndex));
    }
  });
  return players;
}

// 팀 점수 계산
function calculateTeamScore(players) {
  return positions.reduce((total, pos) => {
    const player = players[pos];
    return total + (player ? player.score : 0);
  }, 0);
}

export { positions, teams, generatePlayers, calculateTeamScore };
