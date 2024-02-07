const maleNames = [
    "Adam", "Martin", "Lukáš", "David", "Petr", "Tomáš", "Jakub", "Jiří", "Michal", "Ondřej",
    "Jan", "Filip", "Matěj", "Vojtěch", "Daniel", "Marek", "Dominik", "Patrik", "Radek", "Robert",
    "Eduard", "Antonín", "František", "Emanuel", "Bohumil"
];

const femaleNames = [
    "Anna", "Eva", "Kateřina", "Barbora", "Tereza", "Veronika", "Lucie", "Nikola", "Adéla", "Karolína",
    "Markéta", "Alžběta", "Kristýna", "Hana", "Eliška", "Gabriela", "Petra", "Jana", "Simona", "Viktorie",
    "Michaela", "Denisa", "Pavla", "Ivana", "Zuzana"
];

const maleSurnames = [
    "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
    "Marek", "Král", "Pospíšil", "Urban", "Mach", "Ševčík", "Fišer", "Ježek", "Šimek", "Vlček",
    "Růžička", "Hájek", "Hanák", "Bureš", "Fiala"
];

const femaleSurnames = [
    "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
    "Marková", "Králová", "Pospíšilová", "Urbanová", "Machová", "Ševčíková", "Fišerová", "Ježková", "Šimková", "Vlčková",
    "Růžičková", "Hájková", "Hanáková", "Burešová", "Fialová"
];

const workloads = [10, 20, 30, 40];
const genders = ["male", "female"];

function createPerson(maleNames, femaleNames, workloads, genders, maleSurnames, femaleSurnames, minAge, maxAge) {
    randomGender = genders[Math.floor(Math.random() * genders.length)];

    let randomName = "";
    let randomSurname = "";

    if (randomGender == "male") {
        randomName = maleNames[Math.floor(Math.random() * maleNames.length)];
        randomSurname = maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
    } else {
        randomName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        randomSurname = femaleSurnames[Math.floor(Math.random() * femaleSurnames.length)];
    }

    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    const generateBirthdate = (minAge, maxAge) => {
        const currentDate = new Date();
        const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        const year = currentDate.getFullYear() - randomAge;
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 28) + 1;
        const birthdate = new Date(year, randomMonth, randomDay);
        const formattedBirthdate = birthdate.toISOString();
        return formattedBirthdate;
    };

    return {
        gender: randomGender,
        birthdate: generateBirthdate(minAge, maxAge),
        name: randomName,
        surname: randomSurname,
        workload: workload
    };
}

function createPersonArray(dtoIn) {
    const { count, age } = dtoIn;
    const dtoOut = [];

    for (let i = 0; i < count; i++) {
        const newPerson = createPerson(maleNames, femaleNames, workloads, genders, maleSurnames, femaleSurnames, age.min, age.max);
        dtoOut.push(newPerson);
    }

    return dtoOut;
}

function getEmployeeChartContent(employeeData) {
    const names = {
        all: {},
        male: {},
        female: {},
        femalePartTime: {},
        maleFullTime: {}
    };

    employeeData.forEach(employee => {
        names.all[employee.name] = (names.all[employee.name] || 0) + 1;

        if (employee.gender === 'male') {
            names.male[employee.name] = (names.male[employee.name] || 0) + 1;
            if (employee.workload === 40) {
                names.maleFullTime[employee.name] = (names.maleFullTime[employee.name] || 0) + 1;
            }
        } else if (employee.gender === 'female') {
            names.female[employee.name] = (names.female[employee.name] || 0) + 1;
            if (employee.workload < 40) {
                names.femalePartTime[employee.name] = (names.femalePartTime[employee.name] || 0) + 1;
            }
        }
    });

    const chartData = {
        all: Object.entries(names.all).map(([label, value]) => ({ label, value })),
        male: Object.entries(names.male).map(([label, value]) => ({ label, value })),
        female: Object.entries(names.female).map(([label, value]) => ({ label, value })),
        femalePartTime: Object.entries(names.femalePartTime).map(([label, value]) => ({ label, value })),
        maleFullTime: Object.entries(names.maleFullTime).map(([label, value]) => ({ label, value }))
    };

    return { names, chartData };
}

function main(dtoIn) {
    const employeeData = createPersonArray(dtoIn);
    const dtoOut = getEmployeeChartContent(employeeData);
    return dtoOut;
}

const dtoIn = {
    count: 100,
    age: {
        min: 18,
        max: 60
    }
};

const result = main(dtoIn);
console.log(result);
