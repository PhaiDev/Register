document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const progressBar = document.querySelector('.progress-bar-fill');
    let currentStep = 0;

    // --- Configuration ---
    const executivePositions = [
        "1. ประธานสภานักเรียน",
        "2. รองประธานสภานักเรียนฝ่ายบริหารงานวิชาการ",
        "3. รองประธานสภานักเรียนฝ่ายบริหารงบประมาณ",
        "4. รองประธานสภานักเรียนฝ่ายบริหารงานบุคคล",
        "5. รองประธานสภานักเรียนฝ่ายบริหารทั่วไป"
    ];

    const memberPositions = [
        "6. เหรัญญิก", "7. ผู้ช่วยเหรัญญิก",
        "8. หัวหน้างานกิจกรรมและกีฬา", "9. ผู้ช่วยงานกิจกรรมและกีฬา",
        "10. หัวหน้างานวิชาการ", "11. ผู้ช่วยงานวิชาการ",
        "12. หัวหน้างานปฏิคม", "13. ผู้ช่วยงานปฏิคม",
        "14. หัวหน้างานประชาสัมพันธ์", "15. ผู้ช่วยงานประชาสัมพันธ์",
        "16. หัวหน้างานสถานที่", "17. ผู้ช่วยงานสถานที่",
        "18. หัวหน้างานพัสดุ", "19. ผู้ช่วยงานพัสดุ",
        "20. หัวหน้างานธุรการ", "21. ผู้ช่วยงานธุรการ",
        "22. หัวหน้างานสารวัตรนักเรียน", "23. ผู้ช่วยงานสารวัตรนักเรียน",
        "24. เลขานุการ", "25. ผู้ช่วยเลขานุการ"
    ];

    // --- Initialization ---
    initExercises();
    initMembers();

    function initExercises() {
        const container = document.getElementById('executivesContainer');
        executivePositions.forEach((pos, index) => {
            const div = document.createElement('div');
            div.className = 'executive-card';
            if (index > 0) div.style.marginTop = "40px";
            div.style.border = "1px solid #e2e8f0";
            div.style.padding = "20px";
            div.style.borderRadius = "12px";
            div.style.background = "#f8fafc";

            div.innerHTML = `
                <h3 style="color: #1e40af; margin-bottom: 20px; font-size: 1.2rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">${pos}</h3>
                
                <div class="form-grid">
                    <div class="full-width"><h4 style="color:#64748b; margin-top:10px;">ข้อมูลส่วนตัว</h4></div>
                    
                    <div class="input-group">
                        <label>ชื่อ-นามสกุล</label>
                        <input type="text" data-role="exec" data-id="${index}" name="name" required>
                    </div>
                    <div class="input-group">
                        <label>ชื่อเล่น</label>
                        <input type="text" data-role="exec" data-id="${index}" name="nickname" required>
                    </div>
                    
                    <div class="input-group">
                        <label>ระดับชั้น (เช่น 5)</label>
                        <input type="text" data-role="exec" data-id="${index}" name="level" required>
                    </div>
                    <div class="input-group">
                        <label>ห้อง (เช่น 3)</label>
                        <input type="text" data-role="exec" data-id="${index}" name="room" required>
                    </div>
                    <div class="input-group">
                        <label>แผนการเรียน</label>
                        <input type="text" data-role="exec" data-id="${index}" name="sp" required>
                    </div>
                    
                    <div class="input-group">
                         <label>วันเกิด (จันทร์-อาทิตย์)</label>
                         <input type="text" data-role="exec" data-id="${index}" name="d" required>
                    </div>
                    
                    <div class="input-group">
                        <label>วัน (เลขที่)</label>
                        <input type="number" data-role="exec" data-id="${index}" name="day" required>
                    </div>
                    <div class="input-group">
                        <label>เดือน</label>
                        <input type="text" data-role="exec" data-id="${index}" name="m" required>
                    </div>
                     <div class="input-group">
                        <label>พ.ศ.</label>
                        <input type="number" data-role="exec" data-id="${index}" name="y" required>
                    </div>
                    <div class="input-group">
                        <label>อายุ</label>
                        <input type="number" data-role="exec" data-id="${index}" name="age" required>
                    </div>

                    <div class="input-group full-width">
                        <label>ที่อยู่</label>
                        <textarea data-role="exec" data-id="${index}" name="addess" rows="2" required></textarea>
                    </div>

                    <div class="input-group">
                        <label>Facebook</label>
                        <input type="text" data-role="exec" data-id="${index}" name="facebook">
                    </div>
                    <div class="input-group">
                        <label>Line ID</label>
                        <input type="text" data-role="exec" data-id="${index}" name="line">
                    </div>
                    <div class="input-group">
                        <label>เลขบัตรประชาชน</label>
                        <input type="text" data-role="exec" data-id="${index}" name="id" maxlength="17" required>
                    </div>
                     <div class="input-group">
                        <label>รหัสนักเรียน</label>
                        <input type="text" data-role="exec" data-id="${index}" name="idStudent" required>
                    </div>
                    <div class="input-group">
                        <label>เบอร์โทรศัพท์</label>
                        <input type="text" data-role="exec" data-id="${index}" name="phone" required>
                    </div>

                    <div class="full-width"><h4 style="color:#64748b; margin-top:20px;">ประวัติการศึกษา (ประถม)</h4></div>
                    <div class="input-group full-width"><label>โรงเรียน</label><input type="text" data-role="exec" data-id="${index}" name="j" required></div>
                    <div class="input-group"><label>ตำบล</label><input type="text" data-role="exec" data-id="${index}" name="jt" required></div>
                    <div class="input-group"><label>อำเภอ</label><input type="text" data-role="exec" data-id="${index}" name="jo" required></div>
                    <div class="input-group"><label>จังหวัด</label><input type="text" data-role="exec" data-id="${index}" name="jj" required></div>

                    <div class="full-width"><h4 style="color:#64748b; margin-top:20px;">ประวัติการศึกษา (มัธยมต้น)</h4></div>
                    <div class="input-group full-width"><label>โรงเรียน</label><input type="text" data-role="exec" data-id="${index}" name="jh" required></div>
                    <div class="input-group"><label>ตำบล</label><input type="text" data-role="exec" data-id="${index}" name="jht" required></div>
                    <div class="input-group"><label>อำเภอ</label><input type="text" data-role="exec" data-id="${index}" name="jho" required></div>
                    <div class="input-group"><label>จังหวัด</label><input type="text" data-role="exec" data-id="${index}" name="jhj" required></div>

                    <div class="full-width"><h4 style="color:#64748b; margin-top:20px;">การศึกษาปัจจุบัน</h4></div>
                    <div class="input-group"><label>โรงเรียน</label><input type="text" data-role="exec" data-id="${index}" name="c" value="โรงเรียนนางรอง" required></div>
                    <div class="input-group"><label>ระดับชั้น</label><input type="text" data-role="exec" data-id="${index}" name="clevel" required></div>
                    <div class="input-group"><label>ห้อง</label><input type="text" data-role="exec" data-id="${index}" name="croom" required></div>
                    <div class="input-group"><label>เกรดเฉลี่ย (GPA)</label><input type="text" data-role="exec" data-id="${index}" name="cgpx" required></div>

                    <div class="full-width"><h4 style="color:#64748b; margin-top:20px;">ประสบการณ์และทัศนคติ</h4></div>
                    <div class="input-group full-width">
                        <label>ประสบการณ์</label>
                        <textarea data-role="exec" data-id="${index}" name="experience" rows="3"></textarea>
                    </div>
                    <div class="input-group full-width">
                        <label>ทัศนคติ/Mindset</label>
                        <textarea data-role="exec" data-id="${index}" name="mindset" rows="3"></textarea>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    function initMembers() {
        const container = document.getElementById('membersContainer');
        memberPositions.forEach((pos, index) => {
            const div = document.createElement('div');
            div.className = 'member-input-row';
            div.style.marginBottom = "15px";
            div.style.padding = "15px";
            div.style.border = "1px solid #e2e8f0";
            div.style.borderRadius = "8px";
            div.style.background = "#fff";

            div.innerHTML = `
                <div style="font-weight:bold; margin-bottom:10px; color:#3b82f6;">${pos}</div>
                <div class="form-grid" style="gap: 10px;">
                    <div class="input-group" style="margin-bottom:0;"><input type="text" data-role="member" data-id="${index}" name="name" placeholder="ชื่อ-สกุล" required></div>
                    <div class="input-group" style="margin-bottom:0;"><input type="text" data-role="member" data-id="${index}" name="nickname" placeholder="ชื่อเล่น" required></div>
                    <div class="input-group" style="margin-bottom:0;"><input type="text" data-role="member" data-id="${index}" name="level" placeholder="ระดับชั้น" required></div>
                    <div class="input-group" style="margin-bottom:0;"><input type="text" data-role="member" data-id="${index}" name="room" placeholder="ห้อง" required></div>
                    <div class="input-group full-width" style="margin-bottom:0;"><input type="text" data-role="member" data-id="${index}" name="phone" placeholder="เบอร์โทรศัพท์" required></div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // --- Navigation ---
    function updateStep(stepIndex) {
        steps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));

        stepIndicators.forEach((indicator, index) => {
            if (index < stepIndex) indicator.className = 'step-indicator completed';
            else if (index === stepIndex) indicator.className = 'step-indicator active';
            else indicator.className = 'step-indicator';
        });

        const progress = (stepIndex / (steps.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentStep = stepIndex;

        if (stepIndex === 3) generatePreview();
    }

    window.nextStep = () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < steps.length - 1) updateStep(currentStep + 1);
    };

    window.prevStep = () => {
        if (currentStep > 0) updateStep(currentStep - 1);
    };

    function validateStep(stepIndex) {
        const activeStep = steps[stepIndex];
        const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
        if (!isValid) UI.showToast('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return true;
    }

    // --- Data Collection ---
    function collectData() {
        const teamName = document.querySelector('input[name="team"]').value;
        const email = document.querySelector('input[name="email"]').value; // Collect Email
        const policy = document.querySelector('textarea[name="policy"]').value;

        // Collect 5 Executives
        const president = [];
        for (let i = 0; i < 5; i++) {
            const inputs = document.querySelectorAll(`[data-role="exec"][data-id="${0}"]`);
            const obj = {};
            inputs.forEach(input => {
                obj[input.name] = input.value;
            });
            president.push(obj);
        }

        // Collect members: Combine Execs (pos 1-5) + Regular Members (pos 6-25)
        const members = [];

        // 1. Add Executives to Members array
        president.forEach(p => {
            members.push({
                name: p.name,
                nickname: p.nickname,
                level: p.level,
                room: p.room,
                phone: p.phone
            });
        });

        // 2. Add Regular Members
        for (let i = 0; i < 20; i++) {
            const inputs = document.querySelectorAll(`[data-role="member"][data-id="${i}"]`);
            const obj = {};
            inputs.forEach(input => {
                obj[input.name] = input.value;
            });
            members.push(obj);
        }

        return {
            team: teamName,
            email: email, // Add Email to payload
            policy: policy,
            president: president,
            members: members
        };
    }

    function generatePreview() {
        const data = collectData();
        const allPositions = [...executivePositions, ...memberPositions];

        const previewHTML = `
            <div style="background:#f1f5f9; padding:20px; border-radius:10px;">
                <h3 style="color:#3b82f6;">ทีม: ${data.team}</h3>
                <div style="white-space: pre-wrap; margin-bottom:20px;"><strong>นโยบาย:</strong><br>${data.policy}</div>
                
                <h4 style="margin-top:20px;">สมาชิกทั้งหมด 25 ท่าน (รวมคณะกรรมการบริหาร)</h4>
                <ul>
                    ${data.members.map((m, i) => `<li>${allPositions[i] || (i + 1)}: ${m.name} (${m.nickname})</li>`).join('')}
                </ul>
            </div>
        `;
        document.getElementById('previewContent').innerHTML = previewHTML;
    }

    // --- Submission ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!confirm('ยืนยันการส่งข้อมูล?')) return;

        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerText;
        btn.innerText = 'กำลังส่ง...';
        btn.disabled = true;

        const finalData = collectData();

        try {
            const response = await fetch('/api/form/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            const result = await response.json();
            if (result.status === 'success' || result.success) {
                UI.showToast('สำเร็จ', 'ส่งข้อมูลเรียบร้อยแล้ว', 'success');
                setTimeout(() => window.location.href = '/success', 2500);
            } else {
                throw new Error('Server returned error');
            }

        } catch (error) {
            console.error(error);
            UI.showToast('ข้อผิดพลาด', 'ไม่สามารถส่งข้อมูลได้', 'error');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
});
