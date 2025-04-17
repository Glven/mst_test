const afterMedium = `
    <p class="content__text">
        <span class="line">
            We're here
            <span class="video-wrapper">
            <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
            to make
        </span>
        <span class="line">
            healthy
            <span class="video-wrapper">
            <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
            living effortless,
        </span>
        <span class="line">
            so you can
            <span class="video-wrapper">
            <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
            live longer
        </span>
        <span class="line">
            and happier
            <span class="video-wrapper">
            <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
        </span>
    </p>
`

const beforeMedium = `
    <p class="content__text">
        <span class="line">
            We're here
            <span class="video-wrapper">
                <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
        </span>
        <span class="line">
            to 
            <span class="video-wrapper">
                <video autoplay muted loop src="./video/video.mp4"></video>
            </span> 
            make
        </span>
        <span class="line">
            <span class="video-wrapper">
            <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
            healthy living 
        </span>
        <span class="line">
            effortless, so you
        </span>
        <span class="line">
            can 
            <span class="video-wrapper">
                <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
            live longer
        </span>
        <span class="line">
            and happier
            <span class="video-wrapper">
                <video autoplay muted loop src="./video/video.mp4"></video>
            </span>
        </span>
    </p>
`

let isMobile = window.innerWidth < 768;
let rafId = null;

window.addEventListener('DOMContentLoaded', () => {
    const baseContainer = document.getElementById('content');

    setContent();

    window.addEventListener('resize', () => {
        const nowMobile = window.innerWidth < 768;
        if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        setContent();
        } else {
        debounceSpanVideo();
        }
    });

    function setContent () {
        baseContainer.innerHTML = window.innerWidth < 768 ? beforeMedium : afterMedium; 
        spanVideo();
    }

    function debounceSpanVideo() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
        spanVideo();
        });
    }

    function spanVideo () {
        const videoSpans = document.querySelectorAll('.content__text .video-wrapper');
        const baseRect = baseContainer.getBoundingClientRect();

        videoSpans.forEach((span) => {        
        const video = span.querySelector('video');
        const spanRect = span.getBoundingClientRect();

        video.style.height = `${baseRect.height}px`;
        video.style.width = `${baseRect.width}px`;

        const offsetX = spanRect.left - baseRect.left;
        const offsetY = spanRect.top - baseRect.top;

        video.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
        });
    }
});