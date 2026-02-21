import { z } from 'zod';

// Executive Schema (5 items)
const executiveSchema = z.object({
    name: z.string().min(2, 'ชื่อ-นามสกุล ต้องมีอย่างน้อย 2 ตัวอักษร'),
    nickname: z.string().min(1, 'ต้องระบุชื่อเล่น'),
    level: z.string().min(1, 'ต้องระบุระดับชั้น'),
    room: z.string().min(1, 'ต้องระบุห้อง'),
    plan: z.string().min(1, 'ต้องระบุแผนการเรียน'),
    d: z.string().min(1, 'ต้องระบุวันเกิด'),
    day: z.string().min(1, 'ต้องระบุวันที่เกิด'),
    m: z.string().min(1, 'ต้องระบุเดือนเกิด'),
    y: z.string().min(4, 'ต้องระบุ พ.ศ. ให้ครบ 4 หลัก'),
    age: z.string().min(1, 'ต้องระบุอายุ'),
    addess: z.string().min(5, 'ต้องระบุที่อยู่'),
    facebook: z.string().optional(),
    line: z.string().optional(),
    id: z.string().min(13, 'รหัสประจำตัวประชาชนต้องมี 13 หลัก').max(17),
    idStudent: z.string().min(4, 'รหัสนักเรียนต้องมีอย่างน้อย 4 หลัก'),
    phone: z.string().min(9, 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก'),

    // Education history
    j: z.string().min(1, 'ต้องระบุโรงเรียนประถม'),
    jt: z.string().min(1, 'ต้องระบุตำบล'),
    jo: z.string().min(1, 'ต้องระบุอำเภอ'),
    jj: z.string().min(1, 'ต้องระบุจังหวัด'),
    jh: z.string().min(1, 'ต้องระบุโรงเรียนมัธยมต้น'),
    jht: z.string().min(1, 'ต้องระบุตำบล'),
    jho: z.string().min(1, 'ต้องระบุอำเภอ'),
    jhj: z.string().min(1, 'ต้องระบุจังหวัด'),
    c: z.string().min(1, 'ต้องระบุโรงเรียนปัจจุบัน'),
    clevel: z.string().min(1, 'ต้องระบุระดับชั้นปัจจุบัน'),
    croom: z.string().min(1, 'ต้องระบุห้องปัจจุบัน'),
    cgpx: z.string().min(1, 'ต้องระบุเกรดเฉลี่ย'),

    experience: z.string().optional(),
    mindset: z.string().optional()
});

// Member Schema (25 items: 5 Execs + 20 Members)
const memberSchema = z.object({
    name: z.string().min(2, 'ชื่อสมาชิกต้องมีอย่างน้อย 2 ตัวอักษร'),
    nickname: z.string().min(1, 'ต้องระบุชื่อเล่นสมาชิก'),
    level: z.string().min(1, 'ต้องระบุระดับชั้น'),
    room: z.string().min(1, 'ต้องระบุห้อง'),
    phone: z.string().min(9, 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก')
});

// Main Form Schema
export const registrationSchema = z.object({
    team: z.string().min(2, 'ชื่อพรรคต้องมีอย่างน้อย 2 ตัวอักษร'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    policy: z.string().min(10, 'นโยบายพรรคต้องมีอย่างน้อย 10 ตัวอักษร'),
    president: z.array(executiveSchema).length(5, 'ต้องมีข้อมูลคณะกรรมการบริหารครบ 5 คน'),
    members: z.array(memberSchema).length(25, 'ต้องมีข้อมูลสมาชิกครบ 25 คน (รวมคณะกรรมการ)')
});

// Express Middleware for Validation
export const validateRegistrationForm = (req, res, next) => {
    try {
        const validatedData = registrationSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod v4 uses `error.issues` (not `error.errors`)
            const issues = error.issues ?? error.errors ?? [];
            const errorMessages = issues.map(err => `${err.path.join('.')}: ${err.message}`);
            console.error('Validation Error:', errorMessages);
            return res.status(400).json({
                success: false,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
                errors: errorMessages
            });
        }
        next(error);
    }
};
