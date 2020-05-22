const horse = {
    name: 'Jack',
    size: 'large',
    skills: ['run', 'talk'],
    age: 7
}

const { name, size, skills } = horse;

bio = `${name} is a ${size} skilled in ${skills.join('&')}`

console.log(bio)

