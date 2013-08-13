package java.lang;





/**
 * This is a not fully functional thread using jsthread
 * @author wenhaoli
 *
 */

public class Thread implements Runnable {

	 public final static int MIN_PRIORITY = 1;
	 public final static int NORM_PRIORITY = 5;
	 public final static int MAX_PRIORITY = 10;
	 private ThreadGroup group;
   public final ThreadGroup getThreadGroup() {
       return group;
   }

   public static Thread currentThread() {
       return null;
   }

   /* What will be run. */
   private Runnable target;

   public Thread worker;
   
   private String      name;
   public Thread() {	
   	name = this.getClass().getName();
   }

   /**
    * Allocates a new <code>Thread</code> object. This constructor has 
    * the same effect as <code>Thread(null, target,</code>
    * <i>gname</i><code>)</code>, where <i>gname</i> is 
    * a newly generated name. Automatically generated names are of the 
    * form <code>"Thread-"+</code><i>n</i>, where <i>n</i> is an integer. 
    *
    * @param   target   the object whose <code>run</code> method is called.
    * @see     java.lang.Thread#Thread(java.lang.ThreadGroup, 
    *          java.lang.Runnable, java.lang.String)
    */
   public Thread(Runnable target) {
   	name = this.getClass().getName();
   	this.target = target;
   }

  
   /**
    * Allocates a new <code>Thread</code> object. This constructor has 
    * the same effect as <code>Thread(null, null, name)</code>. 
    *
    * @param   name   the name of the new thread.
    * @see     java.lang.Thread#Thread(java.lang.ThreadGroup, 
    *          java.lang.Runnable, java.lang.String)
    */
   public Thread(String name) {
   	this.name = name;
   }

   /**
    * Allocates a new <code>Thread</code> object. This constructor has 
    * the same effect as <code>Thread(group, null, name)</code> 
    *
    * @param      group   the thread group.
    * @param      name    the name of the new thread.
    * @exception  SecurityException  if the current thread cannot create a
    *               thread in the specified thread group.
    * @see        java.lang.Thread#Thread(java.lang.ThreadGroup, 
    *          java.lang.Runnable, java.lang.String)
    */
   public Thread(ThreadGroup group, String name) {
   	this.name = name;
   }

   /**
    * Allocates a new <code>Thread</code> object. This constructor has 
    * the same effect as <code>Thread(null, target, name)</code>. 
    *
    * @param   target   the object whose <code>run</code> method is called.
    * @param   name     the name of the new thread.
    * @see     java.lang.Thread#Thread(java.lang.ThreadGroup, 
    *          java.lang.Runnable, java.lang.String)
    */
   public Thread(Runnable target, String name) {
   	this.name = name;
   	this.target = target;
   }

   /** 
    * Causes the currently executing thread to sleep (temporarily cease 
    * execution) for the specified number of milliseconds. The thread 
    * does not lose ownership of any monitors.
    *
    * @param      millis   the length of time to sleep in milliseconds.
    * @exception  InterruptedException if another thread has interrupted
    *             the current thread.  The <i>interrupted status</i> of the
    *             current thread is cleared when this exception is thrown.
    * @see        java.lang.Object#notify()
    */
   public static void sleep(long millis) throws InterruptedException {

   }
  
   /**
    * If this thread was constructed using a separate 
    * <code>Runnable</code> run object, then that 
    * <code>Runnable</code> object's <code>run</code> method is called; 
    * otherwise, this method does nothing and returns. 
    * <p>
    * Subclasses of <code>Thread</code> should override this method. 
    *
    * @see     java.lang.Thread#start()
    * @see     java.lang.Thread#stop()
    * @see     java.lang.Thread#Thread(java.lang.ThreadGroup, 
    *          java.lang.Runnable, java.lang.String)
    * @see     java.lang.Runnable#run()
    */
   public void run() {
       if (target != null) {
           target.run();
       }
   }
 

   /**
    * Causes this thread to begin execution; the Java Virtual Machine 
    * calls the <code>run</code> method of this thread. 
    * <p>
    * The result is that two threads are running concurrently: the 
    * current thread (which returns from the call to the 
    * <code>start</code> method) and the other thread (which executes its 
    * <code>run</code> method). 
    *
    * @exception  IllegalThreadStateException  if the thread was already
    *               started.
    * @see        java.lang.Thread#run()
    * @see        java.lang.Thread#stop()
    * 
	 */
   /**
	 * @j2sNative
	  obj_this = this;	 
     function do_run(){
         var datas;
         if(!obj_this.target){
            datas= obj_this.run.toString().replace(new RegExp("this\\.","gm"),"this.obj_this.");
          }else{
            datas= obj_this.target.run.toString().replace(new RegExp("this\\.","gm"),"this.obj_this.");
          }
         datas = eval("("+datas+")");
         obj_this.worker = Concurrent.Thread.create(datas);
     	  console.log("thread starts successfully...");
     }
     console.log('thread starts...');
     do_run();	
	 
	 */
   public  void start() {
   	
   }

   /**
    * @j2sNative
    * 
    *  throw new Exception("please use \n/**\n@j2sNative\ntry{\nConcurrent.Thread.stop();\n}catch(e){}\n*\/{}\n to stop itsself instead of <instance>.stop().For stopping an instance.Consider using kill()\n");
    * 
    * 
    */
   public void stop(){
   }
   
   /**
    * @j2sNative
    *  throw new Exception("please use \n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of <instance>.join()"); 
    */
   public void join(){
   }
   
   /**
    * @j2sNative
    *  throw new Exception("please use \n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of <instance>.join()"); 
    */
   public void join(long millis){   	
   }
   /**
    * @j2sNative
    *  throw new Exception("please use \n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of <instance>.join()"); 
    */
   public void join(long millis,int nanos){   	
   }
   
   /**
    * @j2sNative
    *  throw new Exception("please use \n/**\n@j2sNative\n<instance>.worker.kill()\n*\/{}\n instead of <instance>.kill().\nWARNING: kill() is not a safe method!"); 
    */
   public void kill(){
   }
   
   /**
    * @j2sNative
    *  throw new Exception("please use \n/**\n@j2sNative\nConcurrent.Thread.yield();\n*\/{}\n instead of Thread.yield()"); 
    */
   static public void yield(){
   	
   }


   /**
    * Changes the name of this thread to be equal to the argument 
    * <code>name</code>. 
    * <p>
    * First the <code>checkAccess</code> method of this thread is called 
    * with no arguments. This may result in throwing a 
    * <code>SecurityException</code>. 
    *
    * @param      name   the new name for this thread.
    * @exception  SecurityException  if the current thread cannot modify this
    *               thread.
    * @see        #getName
    * @see        java.lang.Thread#checkAccess()
    * @see        java.lang.Thread#getName()
    */
   public final void setName(String name) {
       this.name = name;
   }

   /**
    * Returns this thread's name.
    *
    * @return  this thread's name.
    * @see     #setName
    * @see     java.lang.Thread#setName(java.lang.String)
    */
   public final String getName() {
       return String.valueOf(name);
   }

   /**
    * Returns a string representation of this thread, including the 
    * thread's name, priority, and thread group.
    *
    * @return  a string representation of this thread.
    */
   public String toString() {
      return name;
   }
   public final void setPriority(int newPriority) {
   	
   }
   public void destroy(){
   	
   }
   
   public boolean isAlive(){
   	if(worker==null){
   		return false;
   	}
   	/**
   	 * @j2sNative
   	 * throw new Exception("Can't determine whether the thread is alive or not!Please avoid to use this method");
   	 */{}
   	return true;
   }
}
