const remHyphenRegex = /( ?- ?)|[ ']/g;
const remRegex = /[^0-9a-zA-Z-]/g;
export default function toSlug(title) {
    return title.replace(remHyphenRegex, "-").replace(remRegex, "").trim().toLowerCase();
}