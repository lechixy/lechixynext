import { FC } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import styles from "styles/main/Home.module.scss";

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