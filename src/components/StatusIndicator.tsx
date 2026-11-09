const StatusIndicator = ({ status }: { status: string }) => {
    return (
        <>
            {status === "online" && (
                <div className="w-4 h-4 rounded-full bg-green-500" />
            )}
            {status === "idle" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="#faa61a" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                </svg>
            )}
            {status === "dnd" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="#f04747" viewBox="0 0 310.285 310.285">
                    <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142  C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32  c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z" />
                </svg>
            )}
            {status === "offline" && (
                <div className="w-4 h-4 rounded-full bg-gray-600" />
            )}
        </>
    );
}

export default StatusIndicator;