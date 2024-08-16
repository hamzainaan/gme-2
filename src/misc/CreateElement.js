export const CreateElement = 
(type, props) => 
{
    const element = document.createElement(type);
    Object.assign(element, props);

    if (props.eventListeners) 
    {
        for (const [event, handler] of Object.entries(props.eventListeners)) 
        {
            element.addEventListener(event, handler);
        }
    }

    return element;
};