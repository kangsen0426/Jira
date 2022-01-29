
import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackRender: FallbackRender }, { error: Error | null }> {

    state = { error: null }

    // 当子组件抛出异常，这里会接受并且调用
    static getDerivedStateFromError(error: Error) {
        return { error }
    }


    render(): React.ReactNode {
        const { error } = this.state
        const { fallbackRender, children } = this.props

        if (error) {

            // 错误抛出异常
            return fallbackRender({ error })
        }

        // 无错误渲染子节点

        return children
    }
}