
const venues = [
    {
        id: 1,
        name: "阳光羽毛球馆",
        type: "羽毛球",
        location: "市中心",
        price: 25,
        facilities: "更衣室、储物柜、淋浴间",
        image: "images/badminton.jpg"
    },
    {
        id: 2,
        name: "城市篮球运动中心",
        type: "篮球",
        location: "西区",
        price: 50,
        facilities: "停车场、更衣室",
        image: "images/basketball.jpg"
    },
    {
        id: 3,
        name: "蓝海游泳馆",
        type: "游泳",
        location: "东区",
        price: 35,
        facilities: "淋浴间、储物柜",
        image: "images/swimming.jpg"
    },
    {
        id: 4,
        name: "活力健身中心",
        type: "健身",
        location: "北区",
        price: 80,
        facilities: "淋浴间、健身器材",
        image: "images/gym.jpg"
    }
];

let selectedVenues = [];

try {
    selectedVenues = JSON.parse(
        localStorage.getItem("selectedVenues") || "[]"
    );
} catch (error) {
    selectedVenues = [];
}

const venueList = document.getElementById("venueList");

function renderVenues(data) {
    venueList.innerHTML = "";

    document.getElementById("resultCount").textContent =
        data.length + "个场馆";

    if (data.length === 0) {
        venueList.innerHTML =
            '<div class="empty-message">没有找到符合条件的场馆</div>';
        return;
    }

    data.forEach(venue => {
        const card = document.createElement("div");

        card.className = "venue-card";

        card.innerHTML = `
            <img src="${venue.image}"
                 alt="${venue.name}"
                 onerror="this.style.display='none'">

            <div class="venue-info">
                <h3>${venue.name}</h3>
                <p>运动类型：${venue.type}</p>
                <p>所在区域：${venue.location}</p>
                <p>配套设施：${venue.facilities}</p>
                <p class="price">参考价格：¥${venue.price}</p>

                <div class="card-buttons">
                    <button onclick="viewDetail(${venue.id})">
                        查看详情
                    </button>

                    <button onclick="addToCompare(${venue.id})">
                        加入对比
                    </button>
                </div>
            </div>
        `;

        venueList.appendChild(card);
    });
}

function searchVenues() {
    const keyword = document.getElementById("searchInput")
        .value.trim().toLowerCase();

    const type = document.getElementById("typeFilter").value;
    const price = document.getElementById("priceFilter").value;

    const filtered = venues.filter(venue => {
        const matchesKeyword =
            venue.name.toLowerCase().includes(keyword) ||
            venue.location.toLowerCase().includes(keyword);

        const matchesType =
            type === "all" || venue.type === type;

        let matchesPrice = true;

        if (price === "low") matchesPrice = venue.price < 30;
        if (price === "medium") matchesPrice =
            venue.price >= 30 && venue.price <= 60;
        if (price === "high") matchesPrice = venue.price > 60;

        return matchesKeyword && matchesType && matchesPrice;
    });

    renderVenues(filtered);
}

document.getElementById("searchButton")
    .addEventListener("click", searchVenues);

document.getElementById("searchInput")
    .addEventListener("input", searchVenues);

document.getElementById("typeFilter")
    .addEventListener("change", searchVenues);

document.getElementById("priceFilter")
    .addEventListener("change", searchVenues);

function addToCompare(id) {
    if (selectedVenues.includes(id)) {
        alert("该场馆已经加入对比！");
        return;
    }

    if (selectedVenues.length >= 3) {
        alert("最多只能选择3个场馆！");
        return;
    }

    selectedVenues.push(id);

    document.getElementById("compareCount").textContent =
        "已选择" + selectedVenues.length + "个场馆";

    localStorage.setItem(
        "selectedVenues",
        JSON.stringify(selectedVenues)
    );
}

function goToComparison() {
    if (selectedVenues.length < 2) {
        alert("请至少选择2个场馆进行对比！");
        return;
    }

    window.location.href = "comparison.html";
}

function viewDetail(id) {
    window.location.href = "detail.html?id=" + id;
}

renderVenues(venues);

document.getElementById("compareCount").textContent =
    "已选择" + selectedVenues.length + "个场馆";
