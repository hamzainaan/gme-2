import { CreateElement } from "../misc/CreateElement.js";
import { DeleteQuestion } from "../api/routes/Contents.js";
import { Market, Config } from "../localization/MarketConfig.js";

const ItemFadeOut = 
(item) => 
{
    item.style.transition = 'opacity 0.5s ease';
    item.style.opacity = '0';
    item.addEventListener('transitionend', () => item.remove(), { once: true });
};


const DeleteButtonProperty = 
(button, item) => 
{
    button.addEventListener('click', async () => {
        const warn_user = confirm(Config[Market].GiveWarningText);

        const link = item.querySelector('[data-test="feed-item-link"]');
        if (link) {
            const question_id = parseInt(link.getAttribute('href').match(/\d+/)[0]);
            await DeleteQuestion(question_id, warn_user)
            .then(res => { if(res.success) { ItemFadeOut(item); } });
        }
    });
};

const PlaceButton = 
async (item) => 
{
    const div = item.querySelector('.sg-flex.sg-flex--align-items-center.sg-space-x-xxs');

    if (div.children.length < 3) 
    {
        const button = await CreateElement('button', { innerHTML: '<span style="font-size: 20px;">🗑️</span>', style: 'border:none;background:none;cursor:pointer;' });
        DeleteButtonProperty(button, item);
        div.appendChild(button);
    }
};

const PlaceButtons = 
async (items) => 
{
    items.forEach(PlaceButton);
};

export const InitFeedPage = 
() => 
{
    //Observer
    var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) 
            {
                mutation.addedNodes.forEach(async (node) => {
                    if (node.classList && node.classList.contains('brn-feed-item-wrapper')) 
                    {
                        await PlaceButton(node);
                    }
                });
            }
        });
    });

    PlaceButtons(document.querySelectorAll('.brn-feed-item-wrapper'));
    observer.observe(document.body, { childList: true, subtree: true });
};