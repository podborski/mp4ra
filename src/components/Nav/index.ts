import NavWrapper from "./NavWrapper";

type NavItem = {
    link: string;
    items?: {
        [key: string]: {
            link: string;
        };
    };
};

export type Meta = {
    social: {
        [key: string]: string;
    };
    menu: {
        "Registered Types": NavItem;
        [key: string]: NavItem;
    };
};

export default NavWrapper;
