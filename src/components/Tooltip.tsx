import { useRouter } from "next/router";
import { FC } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import styles from "styles/main/Home.module.scss";
import NewHomeStyles from "styles/main/New.module.scss";

type DiscordProps = {
    children: React.ReactNode;
    anchorSelect: string;
    id?: string;
    place?: PlacesType;
}

export const NewTooltip: FC<DiscordProps> = (props) => {

    const isNewHome = useRouter().pathname === "/";
    const HomeStyle = isNewHome ? NewHomeStyles : styles;

    return (
        <Tooltip
            className={`${HomeStyle.newTooltip} ${styles[props.id || ""]}`}
            anchorSelect={props.anchorSelect}
            clickable
            openEvents={{ click: true, mouseover: true }}
            closeEvents={{ click: true, mouseleave: true }}
            afterShow={() => {
                document.querySelector(`.${HomeStyle.newTooltip}`)?.classList.add(HomeStyle.active);
            }}
            place={props.place || "top"}
        >
            {props.children}
        </Tooltip>
    );
}
