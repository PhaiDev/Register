import { registrationSchema } from './src/validators/form.validator.js';

const dummyData = {
    team: "Test Team",
    email: "test@example.com",
    policy: "1. test policy long enough",
    president: Array(5).fill({
        name: "Test Name",
        nickname: "Test",
        level: "5",
        room: "1",
        plan: "Science",
        d: "Monday",
        day: "1",
        m: "January",
        y: "2550",
        age: "16",
        addess: "123 Test Address",
        facebook: "",
        line: "",
        id: "1234567890123",
        idStudent: "12345",
        phone: "0812345678",
        j: "Elem", jt: "Tb", jo: "Am", jj: "Pv",
        jh: "Mid", jht: "Tb", jho: "Am", jhj: "Pv",
        c: "High", clevel: "5", croom: "1", cgpx: "3.5",
        experience: "", mindset: ""
    }),
    members: Array(25).fill({
        name: "Test Member",
        nickname: "TM",
        level: "5",
        room: "1",
        phone: "0812345678"
    })
};

try {
    registrationSchema.parse(dummyData);
    console.log("Validation PASSED!");
} catch(e) {
    const issues = e.issues ?? e.errors ?? [];
    console.error("Validation FAILED:", issues.map(err => `${err.path.join('.')}: ${err.message}`));
}
