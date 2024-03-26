interface Trip {
    start: string;
    end: string;
}

interface Shipment {
    pickups: string[];
    dropoffs: string[];
}

function validate_trips_helper(trips: Trip[], shipment: Shipment): boolean {

    const points: Set<string> = new Set([...shipment.pickups, ...shipment.dropoffs]);

    const reachable_points: { [point: string]: boolean } = {};

    points.forEach(point => reachable_points[point] = false);

    shipment.pickups.forEach(pickup => reachable_points[pickup] = true);
    let check = true;

    while (check) {
        check = false;
        for (const trip of trips) {
            if (!reachable_points[trip.end] && reachable_points[trip.start]) {
                reachable_points[trip.end] = true;
                check = true;
            }
        }
    }

    for (const dropoff of shipment.dropoffs) {
        if (!reachable_points[dropoff]) {
            return false;
        }
    }

    return true;
}

const shipment: Shipment = {
    pickups: ["A", "B"],
    dropoffs: ["C", "D"]
};

const trips: Trip[] = [
    { start: "A", end: "W1" },
    { start: "B", end: "W" },
    { start: "W", end: "C" },
    { start: "W", end: "D" }
];

console.log(validate_trips_helper(trips, shipment));