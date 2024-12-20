let activities = [];

// Tambahkan aktivitas ke tabel
function addActivity() {
    const kelas = document.getElementById('kelas').value.trim();
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);

    if (!kelas || isNaN(start) || isNaN(end) || start >= end) {
        alert("Masukkan data yang valid (Nama Kelas, Start < End).");
        return;
    }

    activities.push({ kelas, start, end });
    const tableBody = document.querySelector("#activityTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${activities.length}</td>
        <td>${kelas}</td>
        <td>${start}</td>
        <td>${end}</td>
    `;
    tableBody.appendChild(row);

    document.getElementById('kelas').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
}

function jadwalIteratif(activities) {
    activities.sort((a, b) => a.end - b.end);
    let schedule = [];
    let conflicts = []; // Untuk menyimpan aktivitas yang bentrok
    let lastEnd = 0;

    for (const activity of activities) {
        if (activity.start >= lastEnd) {
            schedule.push(activity);
            lastEnd = activity.end;
        } else {
            conflicts.push(activity); // Simpan aktivitas bentrok
        }
    }

    // Kembalikan jadwal dan konflik
    return { schedule, conflicts };
}


function jadwalRekursif(activities, lastEnd = 0, index = 0, conflicts = []) {
    if (index >= activities.length) {
        return { schedule: [], conflicts }; // Kembalikan jadwal dan konflik
    }

    if (index === 0) {
        activities.sort((a, b) => a.end - b.end);
    }

    const currentActivity = activities[index];

    if (currentActivity.start >= lastEnd) {
        const next = jadwalRekursif(activities, currentActivity.end, index + 1, conflicts);
        return {
            schedule: [currentActivity].concat(next.schedule),
            conflicts: next.conflicts,
        };
    } else {
        conflicts.push(currentActivity); // Simpan aktivitas bentrok
        return jadwalRekursif(activities, lastEnd, index + 1, conflicts);
    }
}


function visualize(scheduleResult, method) {
    const { schedule, conflicts } = scheduleResult;

    // Visualisasi jadwal optimal
    const labels = schedule.map((activity) => activity.kelas);
    const data = schedule.map((activity) => [activity.start, activity.end]);

    const datasets = data.map(([start, end], i) => ({
        label: `${schedule[i].kelas} (${method})`,
        data: [{ x: start, y: i }, { x: end, y: i }],
        borderColor: `hsl(${(i * 60) % 360}, 70%, 50%)`,
        borderWidth: 5,
        showLine: true,
    }));

    const ctx = document.getElementById('ganttChart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets,
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: 'Waktu (24-jam)' },
                },
                y: {
                    ticks: { stepSize: 1, callback: (value) => schedule[value]?.kelas || '' },
                    title: { display: true, text: 'Kelas' },
                },
            },
        },
    });

    // Tampilkan pesan metode yang digunakan
    const processMessage = document.getElementById('processMessage');
    processMessage.innerHTML = `
        Proses menggunakan metode: <span style="color: green;">${method}</span><br>
        Jumlah aktivitas berhasil dijadwalkan: <span style="color: blue;">${schedule.length}</span><br>
        Jumlah aktivitas bentrok: <span style="color: red;">${conflicts.length}</span>
    `;

    // Log aktivitas bentrok
    if (conflicts.length > 0) {
        console.log("Aktivitas Bentrok:");
        conflicts.forEach((conflict) => {
            console.log(`${conflict.kelas} (${conflict.start}-${conflict.end})`);
        });
    } else {
        console.log("Tidak ada aktivitas yang bentrok.");
    }
}


function scheduleIterative() {
    const result = jadwalIteratif(activities);
    console.log("Hasil Iteratif:", result);
    visualize(result, "Iteratif");
}


function scheduleRecursive() {
    const result = jadwalRekursif(activities);
    console.log("Hasil Rekursif:", result);
    visualize(result, "Rekursif");
}

