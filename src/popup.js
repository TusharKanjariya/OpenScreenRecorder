let mediaRecorder;
let recordedChunks = [];

document.getElementById("startRecording").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const video = document.getElementById("preview");
        video.src = url;

        // Download the video automatically
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recording.webm";
        downloadLink.click();
    };

    mediaRecorder.start();
    document.getElementById("startRecording").disabled = true;
    document.getElementById("stopRecording").disabled = false;
});

document.getElementById("stopRecording").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("startRecording").disabled = false;
    document.getElementById("stopRecording").disabled = true;
});
document.addEventListener("DOMContentLoaded", () => {
    // Resize the popup based on the content
    const resizePopup = () => {
        const width = document.body.scrollWidth;
        const height = document.body.scrollHeight;
        document.body.style.width = `${width}px`;
        document.body.style.height = `${height}px`;
    };

    // Resize the popup initially
    resizePopup();

    // Recalculate size when necessary (e.g., video load or dynamic content changes)
    const video = document.getElementById("preview");
    video.addEventListener("loadedmetadata", resizePopup);
});
