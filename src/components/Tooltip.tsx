import type { FC } from "react";
import { Tooltip, type PlacesType } from "react-tooltip";
import styles from "styles/main/Home.module.scss";
import tooltipStyles from "./Tooltip.module.scss";

const presenceTooltipId = "home-presence-tooltip";

export function presenceTooltipAnchor(label?: string) {
    const content = label?.trim();
    return content ? {
        "data-tooltip-id": presenceTooltipId,
        "data-tooltip-content": content,
    } : {};
}

export function PresenceTooltip() {
    return (
        <Tooltip
            id={presenceTooltipId}
            className={tooltipStyles.presenceTooltip}
            positionStrategy="fixed"
            place="top"
            offset={10}
            arrowSize={8}
            border="1px solid var(--tooltip-border)"
            delayShow={160}
            delayHide={90}
            clickable
            openEvents={{ mouseenter: true, focus: true, click: true }}
            closeEvents={{ mouseleave: true, blur: true }}
            globalCloseEvents={{ escape: true, clickOutsideAnchor: true }}
        />
    );
}

type DiscordProps = {
    children: React.ReactNode;
    anchorSelect: string;
    id?: string;
    place?: PlacesType;
}

export const NewTooltip: FC<DiscordProps> = (props) => {
    return (
        <Tooltip
            className={`${styles.newTooltip} ${styles[props.id || ""]}`}
            anchorSelect={props.anchorSelect}
            clickable
            openEvents={{ click: true, mouseover: true }}
            closeEvents={{ click: true, mouseleave: true }}
            afterShow={() => {
                document.querySelector(`.${styles.newTooltip}`)?.classList.add(styles.active);
            }}
            place={props.place || "top"}
        >
            {props.children}
        </Tooltip>
    );
}
