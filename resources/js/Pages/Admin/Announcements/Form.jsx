import CardsWithSticky from "@/Components/CDMLMS/CardsWithSticky"
import IconParse from "@/Components/CDMLMS/IconParse"
import SingleCardWithHeader from "@/Components/CDMLMS/SingleCardWithHeader"
import Dropdown from "@/Components/Dropdown"
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"

export default function Form({ selected, editing = false, back }) {

    const { data, setData, post, patch, errors, processing, reset } = useForm({
        id: '',
        title: '',
        content: '',
        cardtype: 'center',
        icon: '',
        color: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            patch(route('announcements.update', data.id), { onSuccess: () => { back() } });
        } else {
            post(route('announcements.store'), { onSuccess: () => { reset(); back(); } });
        }

    }

    useEffect(() => {
        setData(selected);
    }, [editing]);

    return (
        <CardsWithSticky
            cards={
                <SingleCardWithHeader
                    header={editing ? "Edit Announcement" : "Create Announcement"}
                    body={
                        <>
                            <form onSubmit={submit}>
                                <div className='flex flex-col sm:flex-row gap-4 my-3'>
                                    <div className="flex flex-row justify-between gap-2 sm:gap-4">
                                        <div>
                                            <InputLabel htmlFor='title' value='Title' />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                placeholder="Announcement Title"
                                                autoComplete="title"
                                                isFocused={true}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className='lg:!text-lg'
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <InputLabel htmlFor='cardtype' value='Card Type' />
                                                    <button className='form-control flex flex-row justify-between lg:!text-lg relative !pr-12' type='button'>
                                                        {data.cardtype.charAt(0).toUpperCase() + data.cardtype.slice(1)}
                                                        <ChevronDownIcon className='absolute -translate-y-2/4 top-2/4 right-3 max-w-5 max-h-5 lg:w-8 lg:h-8' />
                                                    </button>
                                                    <InputError message={errors.cardtype} className="mt-2" />
                                                </Dropdown.Trigger>
                                                <Dropdown.Content contentClasses='bg-white text-center' margin="!mt-0" width='w-full'>
                                                    <div className='custom-tooltip-parent cursor-pointer py-1 hover:bg-green-50' onClick={() => { setData('cardtype', 'center') }}>
                                                        Center
                                                        <div className='custom-tooltip-child w-max absolute -translate-y-2/4 top-2/4 right-[105%] sm:left-[105%]'>
                                                            <div className='card'>
                                                                <div className='card-body'>
                                                                    <div className='text-center'>
                                                                        <h1 className='!text-lg !m-0'>center</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='custom-tooltip-parent cursor-pointer py-1 hover:bg-green-50' onClick={() => { setData('cardtype', 'icon') }}>
                                                        Icon
                                                        <div className='custom-tooltip-child w-max absolute -translate-y-2/4 top-2/4 right-[105%] sm:left-[105%]'>
                                                            <div className='card card-icon'>
                                                                <div className='flex flex-row'>
                                                                    <div className='max-h-max w-8 bg-blue-600'>

                                                                    </div>
                                                                    <div className='card-body !pl-2'>
                                                                        <h1 className='!text-lg !m-0'>Icon</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='custom-tooltip-parent cursor-pointer py-1 hover:bg-green-50' onClick={() => { setData('cardtype', 'header') }}>
                                                        Header
                                                        <div className='custom-tooltip-child w-max absolute -translate-y-2/4 top-2/4 right-[105%] sm:left-[105%]'>
                                                            <div className='card !p-0'>
                                                                <div className='card-header !p-1 '>
                                                                    <p className='!m-0'>Header</p>
                                                                </div>
                                                                <div className='card-body !py-1'>
                                                                    <p className='!text-lg !m-0'>body</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Content>
                                            </Dropdown>

                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between gap-2 sm:gap-4">
                                        {
                                            data.cardtype == 'icon' && (
                                                <>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <InputLabel htmlFor='icon' value='Icon' />
                                                                <button className='form-control flex flex-row justify-between lg:!text-lg relative !pr-12' type='button'>
                                                                    <IconParse icon={data.icon} />
                                                                    <ChevronDownIcon className='absolute -translate-y-2/4 top-2/4 right-3 max-w-5 max-h-5 lg:w-8 lg:h-8' />
                                                                </button>
                                                                <InputError message={errors.icon} className="mt-2" />
                                                            </Dropdown.Trigger>
                                                            <Dropdown.Content contentClasses='bg-white ' margin="!mt-0" width='w-full'>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'megaphone') }}><IconParse icon='megaphone' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'exclamation1') }}><IconParse icon='exclamation1' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'exclamation2') }}><IconParse icon='exclamation2' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'paperclip') }}><IconParse icon='paperclip' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'nosymbol') }}><IconParse icon='nosymbol' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'bellalert') }}><IconParse icon='bellalert' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50' onClick={() => { setData('icon', 'calendar') }}><IconParse icon='calendar' size='w-4  h-4 lg:w-6 lg:h-6' /></div>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <InputLabel htmlFor='color' value='Color' />
                                                                <button className='form-control flex flex-row justify-between lg:!text-lg relative !pr-12' type='button'>
                                                                    <div className={`${data.color != '' ? `bg-[${data.color}]` : "bg-[#0066ff]"}  w-5 h-5 lg:w-7 lg:h-7`} />
                                                                    <ChevronDownIcon className='absolute -translate-y-2/4 top-2/4 right-3 w-5 h-5 lg:w-7 lg:h-7' />
                                                                </button>
                                                                <InputError message={errors.color} className="mt-2" />
                                                            </Dropdown.Trigger>
                                                            <Dropdown.Content contentClasses='bg-white text-center' margin="!mt-0" width='w-full'>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#0066ff') }}><div className='bg-[#0066ff]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#996600') }}><div className='bg-[#996600]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#009933') }}><div className='bg-[#009933]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#cc3300') }}><div className='bg-[#cc3300]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#cc0000') }}><div className='bg-[#cc0000]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                                <div className='flex cursor-pointer py-1 items-center place-content-center hover:bg-green-50 relative' onClick={() => { setData('color', '#9900ff') }}><div className='bg-[#9900ff]  w-5 h-5 lg:w-6 lg:h-6' /></div>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>

                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <InputLabel htmlFor='content' value='Content' />
                                    <textarea
                                        id="content"
                                        type="text"
                                        name="content"
                                        value={data.content}
                                        placeholder="Announcement Content"
                                        autoComplete="content"
                                        onChange={(e) => setData('content', e.target.value)}
                                        className='form-control sm:!h-[6rem] md:!h-[12rem] md:!text-md lg:!h-[22rem] lg:!rounded-[4px]  lg:!text-lg lg:!leading-[150%]'
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <PrimaryButton disabled={processing}>
                                    {editing ? "Edit" : "Create"}
                                </PrimaryButton>
                            </form>
                        </>
                    }
                />
            }
            withCard={false}
            stickyNavBody={
                (
                    () => {
                        if (data.cardtype == 'center') {
                            return (
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='text-center'>
                                            <h1 className='!text-lg !m-0 truncate'>{data.title != '' ? data.title : "Title"}</h1>
                                            <p className='!text-lg !mb-1 truncate'>{data.content != '' ? data.content : "Content"}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (data.cardtype == 'icon') {
                            return (
                                <div>
                                    <div className='card card-icon '>
                                        <div className='flex flex-row'>
                                            <div className={`flex flex-row items-center place-content-center max-h-max w-14 ${data.color != '' ? `bg-[${data.color}]` : "bg-[#0066ff]"}`}>
                                                <IconParse icon={data.icon} color='text-white' />
                                            </div>
                                            <div className='card-body !pl-2'>
                                                <h1 className='!text-lg !m-0 truncate'>{data.title != '' ? data.title : "Title"}</h1>
                                                <p className='!m-0 truncate'>{data.content != '' ? data.content : "Content"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (data.cardtype == 'header') {
                            return (
                                <div className='card !p-0'>
                                    <div className='card-header !p-2 !pl-4 '>
                                        <p className='!m-0 truncate'>{data.title != '' ? data.title : "Title"}</p>
                                    </div>
                                    <div className='card-body !py-2'>
                                        <p className='!text-lg !m-0 truncate'>{data.content != '' ? data.content : "Content"}</p>
                                    </div>
                                </div>
                            );
                        }
                    }
                )()
            }
        />
    )
}