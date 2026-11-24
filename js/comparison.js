
const venueData = [
    {
        id: 1,
        name: "阳光羽毛球馆",
        type: "羽毛球",
        location: "市中心",
        price: 25,
        facilities: "更衣室、储物柜、淋浴间",
        image: "images/badminton.jpg",
        hours: "08:00 - 22:00"
    },
    {
        id: 2,
        name: "城市篮球运动中心",
        type: "篮球",
        location: "西区",
        price: 50,
        facilities: "停车场、更衣室",
        image: "images/basketball.jpg",
        hours: "09:00 - 23:00"
    },
    {
        id: 3,
        name: "蓝海游泳馆",
        type: "游泳",
        location: "东区",
        price: 35,
        facilities: "淋浴间、储物柜",
        image: "images/swimming.jpg",
        hours: "07:00 - 21:00"
    },
    {
        id: 4,
        name: "活力健身中心",
        type: "健身",
        location: "北区",
        price: 80,
        facilities: "淋浴间、健身器材",
        image: "images/gym.jpg",
        hours: "06:00 - 22:00"
    }
];

// 从浏览器读取已经选择的场馆
let selectedIds = [];

try {
    selectedIds = JSON.parse(
        localStorage.getItem("selectedVenues") || "[]"
    );

    if (!Array.isArray(selectedIds)) {
        selectedIds = [];
    }
} catch (error) {
    selectedIds = [];
}

// 根据ID找到场馆
function getSelectedVenues() {
    return selectedIds
        .map(id => venueData.find(venue => venue.id === Number(id)))
        .filter(Boolean);
}

// 显示对比页面
function renderComparison() {
    const container = document.getElementById("comparisonContent");

    const selected = getSelectedVenues();

    if (selected.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>暂时没有选择场馆</h3>
                <p>请先返回场馆查询页面，选择至少两个场馆。</p>
                <button class="primary-btn" onclick="goBack()">
                    前往场馆查询
                </button>
            </div>
        `;

        return;
    }

    let html = `
        <div class="comparison-wrapper">
        <table class="comparison-table">

        <thead>
            <tr>
                <th>比较项目</th>
    `;

    selected.forEach(venue => {
        html += `
            <th>
                <img src="${venue.image}"
                     alt="${venue.name}"
                     onerror="this.style.display='none'">

                <span class="venue-name">
                    ${venue.name}
                </span>
            </th>
        `;
    });

    html += `
            </tr>
        </thead>

        <tbody>
    `;

    const rows = [
        {
            label: "运动类型",
            key: "type"
        },
        {
            label: "所在区域",
            key: "location"
        },
        {
            label: "参考价格",
            key: "price",
            format: value => `¥${value}`
        },
        {
            label: "开放时间",
            key: "hours"
        },
        {
            label: "配套设施",
            key: "facilities"
        }
    ];

    rows.forEach(row => {
        html += `
            <tr>
                <td>${row.label}</td>
        `;

        selected.forEach(venue => {
            const value = row.format
                ? row.format(venue[row.key])
                : venue[row.key];

            const className = row.key === "price"
                ? "price-highlight"
                : "";

            html += `
                <td class="${className}">
                    ${value}
                </td>
            `;
        });

        html += `</tr>`;
    });

    // 删除场馆按钮
    html += `
        <tr>
            <td>操作</td>
    `;

    selected.forEach(venue => {
        html += `
            <td>
                <button class="delete-btn"
                    onclick="removeVenue(${venue.id})">
                    删除场馆
                </button>
            </td>
        `;
    });

    html += `
        </tr>
        </tbody>
        </table>
        </div>
    `;

    container.innerHTML = html;
}

// 删除一个场馆
function removeVenue(id) {
    selectedIds = selectedIds.filter(
        item => Number(item) !== Number(id)
    );

    localStorage.setItem(
        "selectedVenues",
        JSON.stringify(selectedIds)
    );

    renderComparison();
}

// 清空全部对比
function clearComparison() {
    if (!confirm("确定清空所有已选场馆吗？")) {
        return;
    }

    selectedIds = [];

    localStorage.removeItem("selectedVenues");

    renderComparison();
}

// 返回场馆查询页面
function goBack() {
    window.location.href = "venues.html";
}

// 初始化
renderComparison();
