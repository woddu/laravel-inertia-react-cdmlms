import React, { useEffect, useState } from 'react'
import SingleCardWithHeader from '@/Components/CDMLMS/SingleCardWithHeader'
import { PencilIcon, TrashIcon, ArchiveBoxXMarkIcon, CheckIcon, XMarkIcon, TrophyIcon, PlusIcon, EllipsisVerticalIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Layout from '@/Layouts/Layout'
import { Head, Link, useForm } from '@inertiajs/react'
import CardsWithSticky from '@/Components/CDMLMS/CardsWithSticky'
import AlertCard from '@/Components/CDMLMS/AlertCard';
import SingleCardCenter from '@/Components/CDMLMS/SingleCardCenter';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import OverlapHeader from '@/Components/CDMLMS/OverlapHeader';
import Table from '@/Components/CDMLMS/Table';
import Dropdown from '@/Components/Dropdown';


/**
 * @function Page Page of the Accomplishment Reports
 * 
 * @param auth The Authentication 
 * @param paginated Accomplishment Reports 
 * @returns Page
 */
export default function AccomplishmentReports({ auth, paginated }) {

    const [tab, setTab] = useState(0);

    const [editing, setEditing] = useState(false);

    const [warning, setWarning] = useState(false);

    const empty = {
        id: '',
        date: '',
        start: '',
        end: '',
        activity: '',
        venue: '',
        designation: '',
        report: '',
    };

    const [selectedReport, setSelectedReport] = useState(empty);

    const { data, setData, post, patch, errors, hasErrors, processing, reset, recentlySuccessful } = useForm(empty);

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            console.log(data.id);
            patch(route('accomplishmentreports.update', data.id), { onSuccess: () => reset(), preserveScroll: true });
        } else {
            console.log(data);
            console.log('creating');
            post(route('accomplishmentreports.store'), { onSuccess: () => { reset(); setTab(0); }, preserveScroll: true });
            console.log(errors)

        }
    }

    return (
        <Layout
            isAdmin={auth.isAdmin}
            user={auth.user}
            warning={
                warning && (
                    <div className='fixed w-full h-full z-[2] bg-black bg-opacity-50'
                        onClick={() => { setWarning(false) }}
                    >
                        <AlertCard
                            icon={<ExclamationTriangleIcon className='w-5 h-5' />}
                            type='alert-warning'
                            title='Warning'
                            message='Delete Report?'
                            actions={
                                <>
                                    <Link href={route('accomplishmentreports.destroy', selectedReport.id)} method='delete' as='button'>
                                        <CheckIcon className='w-5 h-5' />
                                    </Link>
                                    <button onClick={() => { setWarning(false) }}>
                                        <XMarkIcon className='w-5 h-5' />
                                    </button>
                                </>
                            }
                        />
                    </div>
                )
            }
        >
            <Head title='Accomplishment Reports' />
            <OverlapHeader
                icon={<TrophyIcon className='w-9 h-9 text-gray-500' />}
                title='Accomplishment Reports'
                subtitle='View Accomplishment Reports'

            >
                <div className='relative text-gray-400 p-1 my-2'>
                    <div className='absolute bottom-[110%] w-full flex flex-row gap-2 md:mb-1 lg:mb-2'>
                        <button
                            onClick={() => { setTab(0); setEditing(false); setSelectedReport(empty); setData(empty); }}
                            className={`${tab == 0 ? "border-b-2 !text-white" : ""} p-2 `} >
                            View
                        </button>
                        <button
                            onClick={() => { setTab(1); setEditing(false); setSelectedReport(empty); setData(empty); }}
                            className={`${tab == 1 ? "border-b-2 !text-white" : ""} p-2 `} >
                            Create
                        </button>
                        {
                            tab == 2 && (
                                <button className="border-b-2 !text-white p-2 ">
                                    Edit
                                </button>
                            )
                        }
                    </div>
                </div>
                {(
                    () => {

                        if (tab == 0) {
                            return (
                                <SingleCardCenter
                                    bodyPadding='p-4'
                                    table={
                                        <Table
                                            paginated={paginated}
                                            headersCount={9}
                                            headers={
                                                <>
                                                    <th >Date</th>
                                                    <th >Start</th>
                                                    <th >End</th>
                                                    <th >Activity</th>
                                                    <th >Designation</th>
                                                    <th >Venue</th>
                                                    <th >Time Spent</th>
                                                    <th >Report</th>
                                                    <th >Actions</th>
                                                </>
                                            }
                                            body={
                                                paginated.data.map((report, index) => {
                                                    let start = new Date(`${report.date} ${report.start}`);
                                                    let end = new Date(`${report.date} ${report.end}`);
                                                    let nstart = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(start);
                                                    let nend = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(end);

                                                    let [day, date, lstart] = nstart.split(', ')
                                                    let [day_, date_, lend] = nend.split(', ')

                                                    console.log(day);
                                                    console.log(date);
                                                    console.log(lstart);
                                                    return (
                                                        <tr key={report.user_id}>
                                                            <td>{`${day} ${date}`}</td>
                                                            <td>{lstart}</td>
                                                            <td>{lend}</td>
                                                            <td>{report.activity}</td>
                                                            <td>{report.designation}</td>
                                                            <td>{report.venue}</td>
                                                            <td>{report.timespent}</td>
                                                            <td>{report.report}</td>
                                                            <td>
                                                                <Dropdown>
                                                                    <Dropdown.Trigger>
                                                                        <button className='rounded-[50%] hover:bg-gray-200 p-1 mx-2 mt-2' type='button'>
                                                                            <EllipsisVerticalIcon className='w-6 h-6 text-black' />
                                                                        </button>
                                                                    </Dropdown.Trigger>
                                                                    <Dropdown.Content position={index == (paginated.data.length - 1) ? "!bottom-0 right-[105%] !mr-14" : ""} contentClasses='flex flex-col gap-2' margin='mt-1'>
                                                                        <button className='hover:bg-green-50 '
                                                                            onClick={() => {
                                                                                setEditing(true);
                                                                                setData(report);
                                                                                setTab(2);
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button className='hover:bg-green-50 mx-1'
                                                                            onClick={() => {
                                                                                setSelectedReport(report);
                                                                                setWarning(true);
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                )
                                            }
                                        />
                                    }
                                />

                            );

                        } else if (tab == 1 || tab == 2) {
                            return (
                                <SingleCardWithHeader
                                    header=
                                    {
                                        editing ? (
                                            "Edit Report"
                                        ) : (
                                            "Create Report"
                                        )
                                    }
                                    button={
                                        <div className='flex flex-row'>
                                            <div className={`rounded-[50%] h-10 w-10  flex place-content-center items-center mx-3 ${editing ? "bg-sky-700" : "!bg-green-700"}  `}
                                            >
                                                {
                                                    editing ? (
                                                        <PencilIcon className={`h-5 w-5  !text-white `} />
                                                    ) : (
                                                        <PlusIcon className='h-7 w-7 !text-white' />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    }
                                    body={
                                        <form className='p-3' onSubmit={submit}>
                                            <div className='flex flex-row gap-6'>
                                                <div className='w-1/3 flex flex-col gap-4'>
                                                    <div>
                                                        <InputLabel htmlFor="Date">Date</InputLabel>
                                                        <TextInput className='form-control' type="date" value={data.date} onChange={(e) => { setData('date', e.target.value) }} />

                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="Start">Start</InputLabel>
                                                        <TextInput className='form-control' type="time" value={data.start} onChange={(e) => { setData('start', e.target.value) }} />
                                                        {errors.start}
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="End">End</InputLabel>
                                                        <TextInput className='form-control' type="time" value={data.end} onChange={(e) => { setData('end', e.target.value) }} />
                                                        {errors.end}
                                                    </div>
                                                </div>
                                                <div className='w-2/3 flex flex-col gap-4'>
                                                    <div>
                                                        <InputLabel htmlFor="Activity">Activity</InputLabel>
                                                        <TextInput className='form-control' type="text" value={data.activity} onChange={(e) => { setData('activity', e.target.value) }} />
                                                        {errors.activity}
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="Venue">Venue</InputLabel>
                                                        <TextInput className='form-control' type="text" value={data.venue} onChange={(e) => { setData('venue', e.target.value) }} />
                                                        {errors.venue}
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="Designation">Designation</InputLabel>
                                                        <TextInput className='form-control' type="text" value={data.designation} onChange={(e) => { setData('designation', e.target.value) }} />
                                                        {errors.designation}
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="Report">Report</InputLabel>
                                                        <TextInput className='form-control' type="text" value={data.report} onChange={(e) => { setData('report', e.target.value) }} />
                                                        {errors.report}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" disabled={processing}>
                                                {
                                                    editing ? (
                                                        "Edit"
                                                    ) : (
                                                        "Add"
                                                    )
                                                }
                                            </button>
                                        </form>
                                    }
                                />
                            );
                        }
                    }
                )()}
            </OverlapHeader>

        </Layout >
    )
}
