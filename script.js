class TagManager {
    constructor() {
        this.tags = localStorage.getItem("tags") ? new Set(JSON.parse(localStorage.getItem("tags"))) : new Set();
    }

    addTag(tag) {
        this.tags.add(tag.toLowerCase());
        this.saveTags();
    }

    removeTag(tag) {
        this.tags.delete(tag.toLowerCase());
        this.saveTags();
    }

    getTags() {
        return [...this.tags];
    }

    saveTags() {
        localStorage.setItem("tags", JSON.stringify([...this.tags]));
    }
}

const tagManager = new TagManager();
const addTagButton = document.getElementById("add-tag");
const tagInput = document.getElementById("tag");
const tagsContainer = document.getElementById("tags");

function loadTags() {
    tagsContainer.innerHTML = "";
    const storedTags = tagManager.getTags();
    storedTags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "badge d-flex align-items-center rounded-pill m-2";
        tagElement.innerHTML = `
            <span class="px-1 text-light">${tag}</span>
            <button class="btn m-0 p-0 remove-tag">
                <iconify-icon icon="line-md:remove" class="remove"></iconify-icon>
            </button>
        `;
        tagsContainer.appendChild(tagElement);

        tagElement.querySelector(".remove-tag").addEventListener("click", () => {
            tagManager.removeTag(tag);
            loadTags();
        });
    });
}

addTagButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newTag = tagInput.value.trim();
    if (newTag) {
        tagManager.addTag(newTag);
        tagInput.value = "";
        loadTags();
    }
});

document.addEventListener("DOMContentLoaded", loadTags);