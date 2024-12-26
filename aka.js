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

// Fungsi untuk menghasilkan data aktivitas acak
function generateRandomActivities(num) {
    const activities = [];
    for (let i = 0; i < num; i++) {
        const start = Math.floor(Math.random() * 100);
        const finish = start + Math.floor(Math.random() * 10) + 1;
        activities.push([start, finish]);
    }
    return activities;
}

// Testing running time dengan berbagai ukuran input
const testSizes = [10, 100, 300, 500, 1000, 2000, 3000];
testSizes.forEach(size => {
    const testActivities = generateRandomActivities(size);

    console.log(`\nInput Size: ${size}`);

    // Test Iteratif
    console.time("Iterative Time");
    greedyActivitySelectionIterative([...testActivities]);
    console.timeEnd("Iterative Time");

    // Test Rekursif
    console.time("Recursive Time");
    greedyActivitySelectionRecursive([...testActivities].sort((a, b) => a[1] - b[1])); // Urutkan untuk rekursif
    console.timeEnd("Recursive Time");
});
