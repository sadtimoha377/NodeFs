import fs from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = "B:/code";
const TARGET_DIR = "node_modules";

const findNodeModules = async (currentDir) => {
    let entries;

    try {
        entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
        console.error("Skip:", currentDir, error.code);
        return 0;
    }

    let found = 0;

    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const fullPath = path.join(currentDir, entry.name);

        if (entry.name === TARGET_DIR) {
            console.log(fullPath);
            found += 1;
            continue;
        }

        found += await findNodeModules(fullPath);
    }

    return found;
};

const run = async () => {
    console.log("Scan root:", ROOT_DIR);
    console.log("");

    const total = await findNodeModules(ROOT_DIR);

    console.log("");
    console.log("Total node_modules found:", total);
};

run();
