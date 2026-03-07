/**
 * Tabs Component Usage Examples
 * 
 * This file demonstrates how to use the Tabs component with both DaisyUI and Radix styles
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

// Example 1: DaisyUI Bordered Tabs (Default)
export function BorderedTabsExample() {
  return (
    <Tabs defaultValue="tab1" library="daisy">
      <TabsList variant="bordered">
        <TabsTrigger value="tab1" library="daisy">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" library="daisy">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" library="daisy">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}

// Example 2: DaisyUI Boxed Tabs
export function BoxedTabsExample() {
  return (
    <Tabs defaultValue="tab1" library="daisy">
      <TabsList variant="boxed">
        <TabsTrigger value="tab1" library="daisy">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" library="daisy">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" library="daisy">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}

// Example 3: DaisyUI Lifted Tabs
export function LiftedTabsExample() {
  return (
    <Tabs defaultValue="tab1" library="daisy">
      <TabsList variant="lifted">
        <TabsTrigger value="tab1" library="daisy">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" library="daisy">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" library="daisy">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}

// Example 4: DaisyUI Tabs with Different Sizes
export function SizedTabsExample() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="tab1" library="daisy">
        <TabsList variant="bordered" size="xs">
          <TabsTrigger value="tab1" library="daisy">
            Extra Small
          </TabsTrigger>
          <TabsTrigger value="tab2" library="daisy">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">XS Content</TabsContent>
        <TabsContent value="tab2">XS Content 2</TabsContent>
      </Tabs>

      <Tabs defaultValue="tab1" library="daisy">
        <TabsList variant="bordered" size="sm">
          <TabsTrigger value="tab1" library="daisy">
            Small
          </TabsTrigger>
          <TabsTrigger value="tab2" library="daisy">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">SM Content</TabsContent>
        <TabsContent value="tab2">SM Content 2</TabsContent>
      </Tabs>

      <Tabs defaultValue="tab1" library="daisy">
        <TabsList variant="bordered" size="lg">
          <TabsTrigger value="tab1" library="daisy">
            Large
          </TabsTrigger>
          <TabsTrigger value="tab2" library="daisy">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">LG Content</TabsContent>
        <TabsContent value="tab2">LG Content 2</TabsContent>
      </Tabs>
    </div>
  );
}

// Example 5: Radix Style Tabs (Original)
export function RadixTabsExample() {
  return (
    <Tabs defaultValue="tab1" library="radix">
      <TabsList>
        <TabsTrigger value="tab1" library="radix">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" library="radix">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" library="radix">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}

// Example 6: Tabs with Icons
export function TabsWithIconsExample() {
  return (
    <Tabs defaultValue="home" library="daisy">
      <TabsList variant="bordered">
        <TabsTrigger value="home" library="daisy" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </TabsTrigger>
        <TabsTrigger value="profile" library="daisy" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" library="daisy" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Home content</TabsContent>
      <TabsContent value="profile">Profile content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  );
}
