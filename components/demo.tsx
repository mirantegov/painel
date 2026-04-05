"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarBadge } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Copy01Icon, 
  AlertCircleIcon, 
  Delete02Icon, 
  Share03Icon, 
  ShoppingBag01Icon, 
  MoreHorizontalCircle01Icon, 
  Loading03Icon, 
  PlusSignIcon, 
  MinusSignIcon, 
  ArrowLeft02Icon, 
  ArrowRight02Icon, 
  Tick02Icon, 
  ArrowDown01Icon, 
  ArrowRight01Icon, 
  Search01Icon, 
  Settings01Icon, 
  ArrowUp01Icon,
  Mail01Icon,
  Notification02Icon,
  Home01Icon,
  UserIcon,
  Calendar01Icon,
  FolderOpenIcon,
  StarIcon,
  HeartAddIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons"

export function Demo() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const [progressValue, setProgressValue] = React.useState(66)
  const handleSliderValueChange = React.useCallback((value: number[]) => {
    setSliderValue(value)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-muted p-4 sm:p-6 lg:p-12 dark:bg-background">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Radix Luma Components</h1>
          <p className="mt-2 text-muted-foreground">Todas as variantes de cada componente do preset</p>
        </div>

        {/* Style Overview & Icons */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription className="line-clamp-2">
                Preview das cores e tipografia do tema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-3">
                {[
                  "--background",
                  "--foreground",
                  "--primary",
                  "--secondary",
                  "--muted",
                  "--accent",
                  "--border",
                  "--chart-1",
                  "--chart-2",
                  "--chart-3",
                  "--chart-4",
                  "--chart-5",
                ].map((variant) => (
                  <div
                    key={variant}
                    className="flex flex-col flex-wrap items-center gap-2"
                  >
                    <div
                      className="relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
                      style={
                        {
                          "--color": `var(${variant})`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="hidden max-w-14 truncate font-mono text-[0.60rem] md:block">
                      {variant}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons</CardTitle>
              <CardDescription>Hugeicons com stroke width 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 place-items-center gap-4">
                {[
                  Copy01Icon, AlertCircleIcon, Delete02Icon, Share03Icon,
                  ShoppingBag01Icon, MoreHorizontalCircle01Icon, Loading03Icon, PlusSignIcon,
                  MinusSignIcon, ArrowLeft02Icon, ArrowRight02Icon, Tick02Icon,
                  ArrowDown01Icon, ArrowRight01Icon, Search01Icon, Settings01Icon,
                ].map((Icon, i) => (
                  <Card key={i} className="flex size-8 items-center justify-center rounded-md p-0 ring ring-border *:[svg]:size-4">
                    <HugeiconsIcon icon={Icon} strokeWidth={2} />
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Todas as variantes e tamanhos de botoes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Variants */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Icon Buttons</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="icon-xs" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon-sm" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">With Icons</p>
              <div className="flex flex-wrap gap-2">
                <Button>
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} data-icon="inline-start" />
                  Email
                </Button>
                <Button variant="secondary">
                  Download
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
                <Button variant="outline">
                  <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} data-icon="inline-start" className="animate-spin" />
                  Loading
                </Button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Disabled</p>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Default</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="outline" disabled>Outline</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Group */}
        <Card>
          <CardHeader>
            <CardTitle>Button Group</CardTitle>
            <CardDescription>Agrupamento de botoes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="outline">
                  <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
                </Button>
                <Button variant="outline">
                  <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button>Actions</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon">
                      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Option 1</DropdownMenuItem>
                    <DropdownMenuItem>Option 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Badge */}
        <Card>
          <CardHeader>
            <CardTitle>Badge</CardTitle>
            <CardDescription>Todas as variantes de badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} data-icon="inline-start" />
                Verified
              </Badge>
              <Badge variant="secondary">
                <HugeiconsIcon icon={StarIcon} strokeWidth={2} data-icon="inline-start" />
                Featured
              </Badge>
              <Badge variant="outline">
                New
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-end" />
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Default e Line variants, horizontal e vertical</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Horizontal */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Default (Horizontal)</p>
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4 rounded-lg border p-4">
                  Account settings content
                </TabsContent>
                <TabsContent value="password" className="mt-4 rounded-lg border p-4">
                  Password settings content
                </TabsContent>
                <TabsContent value="settings" className="mt-4 rounded-lg border p-4">
                  General settings content
                </TabsContent>
              </Tabs>
            </div>

            {/* Line Variant */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Line Variant</p>
              <Tabs defaultValue="overview">
                <TabsList variant="line">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 rounded-lg border p-4">
                  Overview content
                </TabsContent>
                <TabsContent value="analytics" className="mt-4 rounded-lg border p-4">
                  Analytics content
                </TabsContent>
                <TabsContent value="reports" className="mt-4 rounded-lg border p-4">
                  Reports content
                </TabsContent>
              </Tabs>
            </div>

            {/* Vertical */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Vertical</p>
              <Tabs defaultValue="profile" orientation="vertical" className="flex gap-4">
                <TabsList>
                  <TabsTrigger value="profile">
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} data-icon="inline-start" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} data-icon="inline-start" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} data-icon="inline-start" />
                    Security
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1">
                  <TabsContent value="profile" className="rounded-lg border p-4">
                    Profile settings content
                  </TabsContent>
                  <TabsContent value="notifications" className="rounded-lg border p-4">
                    Notification preferences
                  </TabsContent>
                  <TabsContent value="security" className="rounded-lg border p-4">
                    Security settings
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Toggle & Toggle Group */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>Toggle buttons e toggle groups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Single Toggles */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Single Toggle</p>
              <div className="flex flex-wrap gap-2">
                <Toggle aria-label="Toggle bold">
                  <HugeiconsIcon icon={BoldIcon} strokeWidth={2} />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle italic">
                  <HugeiconsIcon icon={ItalicIcon} strokeWidth={2} />
                </Toggle>
                <Toggle aria-label="Toggle underline" defaultPressed>
                  <HugeiconsIcon icon={UnderlineIcon} strokeWidth={2} />
                </Toggle>
              </div>
            </div>

            {/* Toggle Group - Single */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Group (Single)</p>
              <ToggleGroup type="single" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <HugeiconsIcon icon={TextAlignLeftIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <HugeiconsIcon icon={TextAlignCenterIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <HugeiconsIcon icon={TextAlignRightIcon} strokeWidth={2} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Toggle Group - Multiple */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Group (Multiple)</p>
              <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <HugeiconsIcon icon={BoldIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <HugeiconsIcon icon={ItalicIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <HugeiconsIcon icon={UnderlineIcon} strokeWidth={2} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Toggle Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle size="sm" aria-label="Small">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
                <Toggle size="default" aria-label="Default">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
                <Toggle size="lg" aria-label="Large">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Avatars, grupos e badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Sizes</p>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Fallback */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Fallback</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* With Badge */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">With Badge</p>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge>
                    <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
                  </AvatarBadge>
                </Avatar>
              </div>
            </div>

            {/* Avatar Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Avatar Group</p>
              <AvatarGroup>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>+5</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>Inputs, checkboxes, radios, switches e sliders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input */}
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="email@example.com" />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="Enter password" />
              </Field>
            </FieldGroup>

            {/* Input Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Input Group</p>
              <FieldGroup>
                <Field>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search..." />
                  </InputGroup>
                </Field>
                <Field>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="example.com" />
                  </InputGroup>
                </Field>
              </FieldGroup>
            </div>

            {/* Textarea */}
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea placeholder="Type your message here..." className="resize-none" />
            </Field>

            {/* Checkbox */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Checkbox</p>
              <div className="flex gap-4">
                <Checkbox id="terms" />
                <Checkbox id="newsletter" defaultChecked />
                <Checkbox id="disabled" disabled />
                <Checkbox id="disabled-checked" disabled defaultChecked />
              </div>
            </div>

            {/* Radio Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Radio Group</p>
              <RadioGroup defaultValue="option-1" className="flex gap-4">
                <RadioGroupItem value="option-1" />
                <RadioGroupItem value="option-2" />
                <RadioGroupItem value="option-3" />
              </RadioGroup>
            </div>

            {/* Switch */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Switch</p>
              <div className="flex gap-4">
                <Switch />
                <Switch defaultChecked />
                <Switch disabled />
                <Switch disabled defaultChecked />
              </div>
            </div>

            {/* Slider */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Slider</p>
              <Slider
                value={sliderValue}
                onValueChange={handleSliderValueChange}
                max={1000}
                min={0}
                step={10}
                className="w-full max-w-md"
                aria-label="Slider"
              />
              <p className="mt-2 text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Progress bar indicator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={progressValue} />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              </Button>
              <span className="ml-2 text-sm text-muted-foreground">{progressValue}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
            <CardDescription>Default e Destructive variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Alert Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialog</CardTitle>
            <CardDescription>Modal de confirmacao</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Show Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    All your data will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Dropdown Menu */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Menu dropdown com grupos e separadores</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open Menu
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Item */}
        <Card>
          <CardHeader>
            <CardTitle>Item</CardTitle>
            <CardDescription>List items com diferentes variantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Item>
              <ItemContent>
                <ItemTitle>Default Item</ItemTitle>
                <ItemDescription>This is a default item with description.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="secondary">Action</Button>
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Outline Item</ItemTitle>
                <ItemDescription>Item with outline variant.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">Edit</Button>
              </ItemActions>
            </Item>

            <Item variant="muted">
              <ItemContent>
                <ItemTitle>Muted Item</ItemTitle>
                <ItemDescription>Item with muted background.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch />
              </ItemActions>
            </Item>
          </CardContent>
        </Card>

        {/* Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
            <CardDescription>Loading placeholders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>

        {/* Separator */}
        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>Horizontal e vertical separators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm">Content above separator</p>
              <Separator className="my-4" />
              <p className="text-sm">Content below separator</p>
            </div>
            <div className="flex h-6 items-center gap-4">
              <span className="text-sm">Item 1</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Item 2</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Item 3</span>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Card Variations</CardTitle>
            <CardDescription>Diferentes layouts de cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Simple Card</CardTitle>
                  <CardDescription>Basic card layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">With Avatar</CardTitle>
                    <CardDescription>Card with avatar header</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">User profile card example.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">With Badge</CardTitle>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <CardDescription>Card with badge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Featured content card.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
