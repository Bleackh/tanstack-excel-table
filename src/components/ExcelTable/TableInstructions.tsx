import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface TableInstructionsProps {
    title?: string
    description?: string
    dragFill?: boolean
    keyboardShortcuts?: boolean
    clipboard?: boolean
    history?: boolean
}

export const TableInstructions: React.FC<TableInstructionsProps> = ({
    title = 'Excel-Like Table',
    description = 'Interactive spreadsheet with advanced features',
    dragFill = true,
    keyboardShortcuts = true,
    clipboard = true,
    history = true,
}) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Basic Operations:</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Click cell to select
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Double-click or Enter to edit
                            </li>
                            {dragFill && (
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Drag green handle to fill
                                </li>
                            )}
                            {keyboardShortcuts && (
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    Arrow keys to navigate
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Keyboard Shortcuts:</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {clipboard && (
                                <>
                                    <li>
                                        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+C</kbd> Copy
                                    </li>
                                    <li>
                                        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+V</kbd> Paste
                                    </li>
                                    <li>
                                        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+X</kbd> Cut
                                    </li>
                                </>
                            )}
                            {history && (
                                <li>
                                    <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Z</kbd> Undo |{' '}
                                    <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Y</kbd> Redo
                                </li>
                            )}
                            <li>
                                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Del</kbd> Delete |{' '}
                                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> Cancel
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
