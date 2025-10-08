import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface DragSelectionIndicatorProps {
    dragSelection: { startRow: number; endRow: number; startCol: string; endCol: string }
}

export const DragSelectionIndicator: React.FC<DragSelectionIndicatorProps> = ({ dragSelection }) => {
    return (
        <Card className="mt-4 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Drag Selection Active
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <span className="font-medium">From:</span> Row {dragSelection.startRow + 1}, Column{' '}
                        {dragSelection.startCol}
                    </div>
                    <div>
                        <span className="font-medium">To:</span> Row {dragSelection.endRow + 1}, Column{' '}
                        {dragSelection.endCol}
                    </div>
                </div>
                <p className="text-blue-600 mt-3 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Release mouse to apply fill operation
                </p>
            </CardContent>
        </Card>
    )
}
