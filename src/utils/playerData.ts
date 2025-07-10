
export type Position = 'C' | 'SP' | 'MR' | 'CL' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'DH';

export interface Player {
  name: string;
  team: string;
  position: Position;
  birthdate: string;
  score: number;
}

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

const generateBirthdate = () => {
  const year = 1990 + Math.floor(Math.random() * 15); // 1990-2004
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${month}/${day}/${year}`;
};

const generatePlayer = (position: Position, teamIndex: number): Player => {
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
};

export const generatePlayers = (): Player[] => {
  const positions: Position[] = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
  const players: Player[] = [];
  
  positions.forEach(position => {
    for (let teamIndex = 0; teamIndex < 10; teamIndex++) {
      players.push(generatePlayer(position, teamIndex));
    }
  });
  
  return players;
};

export const calculateTeamScore = (players: Record<Position, Player | null>): number => {
  const positions: Position[] = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
  return positions.reduce((total, pos) => {
    const player = players[pos];
    return total + (player ? player.score : 0);
  }, 0);
};
