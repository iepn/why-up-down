// 创建按钮元素
var button1 = document.createElement("button");
button1.innerHTML = "跳转到顶部";
button1.style.marginRight = "10px"; // 可以设置按钮样式

var button2 = document.createElement("button");
button2.innerHTML = "跳转到底部";
button2.style.marginRight = "10px"; // 可以设置按钮样式

// 创建一个容器元素，用于包装按钮
var container = document.createElement("div");

// 将按钮添加到容器中
container.appendChild(button1);
container.appendChild(button2);

// 将容器插入到页面顶部
document.body.insertBefore(container, document.body.firstChild);

// 为按钮1添加点击事件，使页面滚动到顶部
button1.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 为按钮2添加点击事件，使页面滚动到底部
button2.addEventListener("click", function() {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );

    window.scrollTo({
        top: documentHeight - windowHeight,
        behavior: 'smooth'
    });
});
