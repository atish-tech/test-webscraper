export const Script = ({ attribute, children }: { attribute: Record<string, string>; children: React.ReactNode }) => {
    return <script {...attribute}>{children}</script>;
    };