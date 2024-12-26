// Fungsi greedy (rekursif)
function greedyActivitySelectionRecursive(activities, index = 0, prevFinish = 0) {
    if (index === activities.length) return [];

    if (activities[index][0] >= prevFinish) {
        return [activities[index]].concat(
            greedyActivitySelectionRecursive(activities, index + 1, activities[index][1])
        );
    } else {
        return greedyActivitySelectionRecursive(activities, index + 1, prevFinish);
    }
}

// Fungsi greedy (iteratif)
function greedyActivitySelectionIterative(activities) {
    activities.sort((a, b) => a[1] - b[1]); // Urutkan berdasarkan waktu selesai
    const selectedActivities = [];
    let prevFinish = 0;

    for (let i = 0; i < activities.length; i++) {
        if (activities[i][0] >= prevFinish) {
            selectedActivities.push(activities[i]);
            prevFinish = activities[i][1];
        }
    }

    return selectedActivities;
}

// Contoh data aktivitas (start_time, finish_time)
const activities = [
    [1, 2],
    [3, 4],
    [0, 6],
    [5, 7],
    [8, 9],
    [5, 9]
];

console.log("Greedy Iteratif:", greedyActivitySelectionIterative(activities));
console.log("Greedy Rekursif:", greedyActivitySelectionRecursive(activities));

// Fungsi untuk menghasilkan aktivitas acak
function generateRandomActivities(n) {
    const activities = [];
    for (let i = 0; i < n; i++) {
        const start = Math.floor(Math.random() * 1000); // Waktu mulai acak (0-999)
        const end = start + Math.floor(Math.random() * 100) + 1; // Waktu selesai (start+1 hingga start+100)
        activities.push([start, end]);
    }
    return activities;
}

// Benchmark algoritma menggunakan console.time
function benchmarkAlgorithms() {
    const testSizes = [10, 100, 300, 500, 1000]; // Ukuran dataset untuk diuji

    console.log("Benchmark Results:");
    testSizes.forEach((n) => {
        const testActivities = generateRandomActivities(n);

        // Iterative method
        console.time(`Iterative (n=${n})`); // Gunakan string template yang benar
        greedyActivitySelectionIterative([...testActivities]);
        console.timeEnd(`Iterative (n=${n})`);

        // Recursive method
        console.time(`Recursive (n=${n})`); // Gunakan string template yang benar
        greedyActivitySelectionRecursive([...testActivities]);
        console.timeEnd(`Recursive (n=${n})`);
    });
}

// Jalankan benchmark
benchmarkAlgorithms();
