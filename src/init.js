import { InitFeedPage } from "./pages/Feed.js";
import { InitOldProfilePage } from "./pages/OldProfile.js";
import { InitUserContentPage } from "./pages/UserContent.js";

const t = async () => {
    
    if (window.location.href.includes('users/user_content')) {
        InitUserContentPage();
    }

    if (window.location.href.includes('https://eodev.com')) {
        InitFeedPage();
    }

    if (window.location.href.includes('profil')) {
        InitOldProfilePage();
    }
}

t();