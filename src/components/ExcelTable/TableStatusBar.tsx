import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ClipboardData } from './types'

interface TableStatusBarProps {
    selectedRange?: { startRow: number; endRow: number; startCol: string; endCol: string } | null
    selectedCell?: { rowIndex: number; colId: string } | null
    clipboardData?: ClipboardData | null
    clipboard?: boolean
    history?: boolean
    historyIndex?: number
    historyLength?: number
    onUndo?: () => void
    onRedo?: () => void
}

export const TableStatusBar: React.FC<TableStatusBarProps> = ({
    selectedRange,
    selectedCell,
    clipboardData,
    clipboard = true,
    history = true,
    historyIndex = 0,
    historyLength = 0,
    onUndo,
    onRedo,
}) => {
    return (
        <Card className="mt-4">
            <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                            {selectedRange
                                ? `Selected: ${selectedRange.startRow + 1}-${selectedRange.endRow + 1} × ${selectedRange.startCol}-${selectedRange.endCol}`
                                : selectedCell
                                    ? `Selected: Row ${selectedCell.rowIndex + 1}, ${selectedCell.colId}`
                                    : 'No selection'}
                        </Badge>
                    </div>

                    {clipboard && (
                        <div className="flex items-center space-x-2">
                            <Badge
                                variant={
                                    clipboardData
                                        ? clipboardData.operation === 'cut'
                                            ? 'destructive'
                                            : 'default'
                                        : 'secondary'
                                }
                            >
                                {clipboardData
                                    ? `${clipboardData.operation === 'cut' ? 'Cut' : 'Copied'}: ${clipboardData.data.length} cells`
                                    : 'Clipboard empty'}
                            </Badge>
                        </div>
                    )}

                    {history && (
                        <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-purple-50">
                                History: {historyIndex + 1}/{historyLength}
                            </Badge>
                            {historyIndex > 0 && (
                                <Button variant="ghost" size="sm" onClick={onUndo}>
                                    Undo
                                </Button>
                            )}
                            {historyIndex < historyLength - 1 && (
                                <Button variant="ghost" size="sm" onClick={onRedo}>
                                    Redo
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
