export default () => {
    const currentHour = new Date().getHours();

    const timeRanges = [
        { start: 5, end: 12, greeting: "Good Morning" },
        { start: 12, end: 18, greeting: "Good Afternoon" },
        { start: 18, end: 22, greeting: "Good Evening" },
        { start: 22, end: 24, greeting: "Good Night" },
        { start: 0, end: 5, greeting: "Good Night" },
    ];

    const currentTimeRange = timeRanges.find(
        (range) => currentHour >= range.start && currentHour < range.end
    );

    return currentTimeRange ? currentTimeRange.greeting : "Unknown";
};
