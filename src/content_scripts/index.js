
class ScrollButton {
    constructor(imageSrc, positionTop, buttonType) {
        this.text = buttonType; 
        this.button = document.createElement("button");
        this.button.classList.add(buttonType);

        const self = this;
        // chrome message request function
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
          if (request.message !== undefined) {
            self.button.style.display = request.message ? "none" : "block";
          }
        });
        
        this.button.style.position = "fixed";
        this.button.style.right = "50px";
        this.button.style.top = positionTop;
        this.button.style.transform = "translateY(-50%)";
        this.button.style.marginRight = "10px";
        this.button.style.cursor = "grab";
        this.button.style.background = "transparent";
        this.button.style.borderStyle = "none";
        this.button.style.zIndex = "99999999999999999";

        // 创建并设置图片
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "icon";
        this.button.appendChild(img);

        document.body.appendChild(this.button);

        this.makeDraggable();
        this.addClickListener();
    }

    addClickListener() {
        this.button.addEventListener("click", () => {
            const scrollTarget = this.button.classList.contains("top-button") ? 0 : this.calculateScrollTarget();
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        });
    }
    
    calculateScrollTarget() {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
        return documentHeight - windowHeight;
    }

    makeDraggable() {
        let isDragging = false;
        let offsetX, offsetY;

        this.button.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - this.button.getBoundingClientRect().left;
            offsetY = event.clientY - this.button.getBoundingClientRect().top;
            this.button.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                let x = event.clientX - offsetX;
                let y = event.clientY - offsetY;

                this.button.style.left = x + "px";
                this.button.style.top = y + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            this.button.style.cursor = "grab";
        });
    }
}

const currentTheme = "default"; 

const buttonTop = new ScrollButton(getImagePath("top-button"), "60%", "top-button");

const buttonBottom = new ScrollButton(getImagePath("bottom-button"), "70%", "bottom-button");

function getImagePath(buttonType) {
    const imagePathObj = getImagePathObject(); 
    return imagePathObj[buttonType];
}

function getImagePathObject() {
    switch (currentTheme) {
        case "default":
            return {
                "top-button": "data:image/svg+xml,%3Csvg width='83' height='83' viewBox='0 0 83 83' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_39_10)'%3E%3Crect x='20' y='15.6899' width='43' height='43' rx='21.5' fill='white'/%3E%3C/g%3E%3Cpath d='M30.3199 42.18L41.4999 31L52.6799 42.18' stroke='%23C4C4C4' stroke-width='2' stroke-linecap='round'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_39_10' x='0.5' y='0.189941' width='82' height='82' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='9.75'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.631576 0 0 0 0 0.631576 0 0 0 0 0.631576 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_39_10'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_39_10' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A",
                "bottom-button": "data:image/svg+xml,%3Csvg width='83' height='83' viewBox='0 0 83 83' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_39_9)'%3E%3Crect x='63' y='59.3101' width='43' height='43' rx='21.5' transform='rotate(-180 63 59.3101)' fill='white'/%3E%3C/g%3E%3Cpath d='M52.6801 34.0001L41.5001 45.1801L30.3201 34.0001' stroke='%23C4C4C4' stroke-width='2' stroke-linecap='round'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_39_9' x='0.5' y='0.810059' width='82' height='82' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='9.75'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.631576 0 0 0 0 0.631576 0 0 0 0 0.631576 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_39_9'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_39_9' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A" 
            };
    }
}
