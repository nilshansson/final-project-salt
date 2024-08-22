import { selectAllClasses } from '@/db/query';
import { ModuleForm } from './module-form';

export default async function CreateModule(){
  const allClasses = await selectAllClasses()

  return (
    <div className='p-20'>
      <h1>Create a New Course Module</h1>
      <ModuleForm allClasses={allClasses}/>
          </div>
  );
};
