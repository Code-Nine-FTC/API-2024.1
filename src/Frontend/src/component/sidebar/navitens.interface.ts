interface NavigationItemInterface {
    label: string;
    path?: string;
    imageUrl?: string;
    dropdownItems?: { label: string; path: string; }[];
}

export default NavigationItemInterface;