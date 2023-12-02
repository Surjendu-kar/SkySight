import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import lottie, { AnimationItem } from 'lottie-web';

interface Props<T> {
    animationData: T;
    message?: string;
}

const Message = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[500],
    fontSize: '1.5rem',
    letterSpacing: 2
}));

// Wrapper for the loader
const FullScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                position: 'fixed', // Fixed position to cover the whole screen
                top: 0,
                left: 0,
                width: '100vw', // Full viewport width
                height: '100vh', // Full viewport height
                backgroundColor: 'rgba(0, 0, 0, .7)', // Semi-transparent black background
                backdropFilter: 'blur(6px)', // Blur effect
                display: 'flex',
                alignItems: 'center', // Center children vertically
                justifyContent: 'center', // Center children horizontally
                zIndex: 1300, // Ensure it's above most other elements
            }}
        >
            {children}
        </Box>
    );
};

const Container = styled(Box)({
    textAlign: 'center',
});

const Loader = <T,>({
    animationData, message = 'Loading...',
}: Props<T>) => {
    const [animation, setAnimation] = useState<AnimationItem | null>(null);

    useEffect(() => {
        return () => {
            if (animation) {
                animation.destroy();
            }
        };
    }, [animation]);

    const initializeAnimation = (element: HTMLDivElement) => {
        if (!animation && element) {
            const animationDataClone = JSON.parse(JSON.stringify(animationData));

            const lottieAnimation = lottie.loadAnimation({
                container: element,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationDataClone,
            });

            setAnimation(lottieAnimation);
        }
    };

    return (
        <FullScreenWrapper>
            <Container>

                {/* animation */}
                <Box
                    ref={initializeAnimation}
                    sx={{ mb: 3 }}
                />

                {/* loading text */}
                <Message>
                    {message}
                </Message>
            </Container>
        </FullScreenWrapper>
    );
};

export default Loader;